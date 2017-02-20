// @flow
import React from 'react';

import { storiesOf, action } from '@kadira/storybook';
import { host } from 'storybook-host';

import { Card, CardText, CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import Chance from 'chance';
const chance = new Chance();

import {
  AddFlightButton,
  DeleteStamButton,
  PublishButton,
  ArchiveButton,
  PulseIcon,
} from './IconButtons';

import moment from 'moment';

const paragraph = chance.paragraph();

const cardHost = story => (
  <Card>
    <CardText>
      {paragraph}
    </CardText>
    <Divider />
    <CardActions>{story()}</CardActions>
  </Card>
);

const containerHost = {
  title: 'StamCard IconButtons',
  align: 'center middle',
  width: '300px',
};

storiesOf('atfcm.shared.StamCard.IconButtons', module)
  .addDecorator(cardHost)
  .addDecorator(host(containerHost))
  .add('AddFlightButton', () => (
    <AddFlightButton
      onClick={action('add_flight')}
    />
  ))
  .add('DeleteStamButton', () => (
    <DeleteStamButton
      onClick={action('delete_stam')}
    />
  ));

storiesOf('atfcm.shared.IconButtons.PulseIcon', module)
  .addDecorator(cardHost)
  .addDecorator(host(containerHost))
  .add('Default', () => (
    <PulseIcon />
  ));

[PublishButton, ArchiveButton].map(Element =>
  storiesOf(`atfcm.shared.IconButtons.${Element.name}`, module)
    .addDecorator(cardHost)
    .addDecorator(host(containerHost))
    .add('Default', () => (
      <Element
        sendTime={null}
        onSelectTime={action('select_time')}
        onCancel={action('cancel')}
      />
    ))
    .add('Disabled', () => (
      <Element
        sendTime={null}
        onSelectTime={action('select_time')}
        onCancel={action('cancel')}
        disabled={true}
      />
    ))
    .add('With sendTime in 5 minutes', () => (
      <Element
        sendTime={moment().add(5, 'minutes').toDate()}
        onSelectTime={action('select_time')}
        onCancel={action('cancel')}
      />
    ))
    .add('With sendTime in 30 seconds', () => (
      <Element
        sendTime={moment().add(30, 'seconds').toDate()}
        onSelectTime={action('select_time')}
        onCancel={action('cancel')}
      />
    ))
    .add('With sendTime in the past', () => (
      <Element
        sendTime={moment().subtract(5, 'minutes').toDate()}
        onSelectTime={action('select_time')}
        onCancel={action('cancel')}
      />
    ))
);

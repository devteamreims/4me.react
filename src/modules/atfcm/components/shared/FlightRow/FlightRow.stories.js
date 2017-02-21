// @flow
import React from 'react';

import { storiesOf, action } from '@kadira/storybook';
import { host } from 'storybook-host';

import { Card, CardText } from 'material-ui/Card';

import { FlightRow } from './FlightRow';

const flight = {
  id: '12345',
  arcid: 'BAW123',
  onloadSector: 'KR',
  implementingSector: 'KD',
  constraint: {
    beacon: 'CLM',
    flightLevel: 360,
  },
};

storiesOf('atfcm.shared.FlightRow')
  .addDecorator(story => (
    <Card>
      <CardText>{story()}</CardText>
    </Card>
  ))
  .addDecorator(host({
    title: 'A Flight displayed in the STAM context',
    align: 'center middle',
    width: '440px',
  }))
  .add('Default', () => (
    <FlightRow
      flight={flight}
    />
  ))
  .add('With actions', () => (
    <FlightRow
      flight={flight}
      onRequestEdit={action('request_edit')}
      onRequestDelete={action('request_delete')}
      onRequestHide={action('request_hide')}
      onRequestUnhide={action('request_unhide')}
    />
  ))
  .add('Hidden with hide/unhide actions', () => (
    <FlightRow
      flight={flight}
      hidden={true}
      onRequestHide={action('request_hide')}
      onRequestUnhide={action('request_unhide')}
    />
  ))
  .add('Without actions, with disabledActions prop', () => (
    <FlightRow
      flight={flight}
      disabledActions={false}
    />
  ))
  .add('With constraint disabled', () => (
    <FlightRow
      flight={flight}
      disabledFlightFields={['constraint']}
    />
  ))
  .add('With all flight fields disabled', () => (
    <FlightRow
      flight={flight}
      disabledFlightFields={['constraint', 'implementingSector', 'onloadSector']}
    />
  ))
  .add('With all flight fields disabled and actions', () => (
    <FlightRow
      flight={flight}
      onRequestEdit={action('request_edit')}
      onRequestDelete={action('request_delete')}
      disabledFlightFields={['constraint', 'implementingSector', 'onloadSector']}
    />
  ));

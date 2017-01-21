// @flow
import React, { Component } from 'react';

import { storiesOf, action } from '@kadira/storybook';
import { host } from 'storybook-host';

import { Card, CardText } from 'material-ui/Card';
import { LightTheme } from '../../../../shared/components/Theme';

import { SendButton } from './SendButton';

import moment from 'moment';


storiesOf('atfcm.Fmp.StamCard.SendButton', module)
  .addDecorator(story => (
    <LightTheme>
      <Card>
        <CardText>{story()}</CardText>
      </Card>
    </LightTheme>
  ))
  .addDecorator(host({
    title: 'StamCard send button',
    align: 'center middle',
    width: '300px',
    height: '100px',
  }))
  .add('Empty state', () => (
    <SendButton
      onSelectTime={action('select_time')}
    />
  ))
  .add('Disabled', () => (
    <SendButton
      onSelectTime={action('select_time')}
      disabled={true}
    />
  ))
  .add('With send time in 5 minutes', () => (
    <SendButton
      onSelectTime={action('select_time')}
      sendTime={moment.utc().add(5, 'minutes').toDate()}
    />
  ))
  .add('With send time in 40 seconds', () => (
    <SendButton
      onSelectTime={action('select_time')}
      sendTime={moment.utc().add(30, 'seconds').toDate()}
    />
  ));

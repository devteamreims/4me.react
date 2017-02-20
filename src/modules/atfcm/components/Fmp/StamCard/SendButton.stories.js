// @flow
import React, { Component } from 'react';

import { storiesOf, action } from '@kadira/storybook';
import { host } from 'storybook-host';

import { Card, CardText } from 'material-ui/Card';

import { SendButton } from './SendButton';

import moment from 'moment';


storiesOf('atfcm.Fmp.StamCard.SendButton')
  .addDecorator(story => (
    <Card>
      <CardText>{story()}</CardText>
    </Card>
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
      onCancelSend={action('cancel_send')}
    />
  ))
  .add('Disabled with send time in 5 minutes', () => (
    <SendButton
      disabled={true}
      onSelectTime={action('select_time')}
      sendTime={moment.utc().add(5, 'minutes').toDate()}
      onCancelSend={action('cancel_send')}
    />
  ))
  .add('With send time in 30 seconds', () => (
    <SendButton
      onSelectTime={action('select_time')}
      sendTime={moment.utc().add(30, 'seconds').toDate()}
      onCancelSend={action('cancel_send')}
    />
  ));

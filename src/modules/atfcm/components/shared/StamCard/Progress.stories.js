// @flow
import React, { Component } from 'react';

import { storiesOf, action } from '@kadira/storybook';
import { host } from 'storybook-host';

import { Card, CardText } from 'material-ui/Card';

import { Progress } from './Progress';

import moment from 'moment';


storiesOf('atfcm.Fmp.StamCard.Progress', module)
  .addDecorator(story => (
    <Card>
      <CardText>{story()}</CardText>
    </Card>
  ))
  .addDecorator(host({
    title: 'StamCard progress bar',
    align: 'center middle',
    width: '300px',
    height: '100px',
  }))
  .add('Normal', () => (
    <Progress
      buffer={30}
      sendTime={moment.utc().add(15, 'seconds').toDate()}
    />
  ))
  .add('With sendtime in 35s', () => (
    <Progress
      buffer={30}
      sendTime={moment.utc().add(35, 'seconds').toDate()}
    />
  ));

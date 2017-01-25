// @flow
import React, { Component } from 'react';

import { storiesOf, action } from '@kadira/storybook';
import { host } from 'storybook-host';

import { Card, CardText } from 'material-ui/Card';


import { FmpMain } from './Main';

const preparedStams = [{
  id: 'id-1',
  offloadSector: 'HYR',
  sendTime: null,
  flights: [],
}];

storiesOf('atfcm.Fmp.Main', module)
  .addDecorator(story => (
    <Card>
      <CardText>{story()}</CardText>
    </Card>
  ))
  .addDecorator(host({
    title: 'Main FMP View',
    align: 'center middle',
    width: '100%',
  }))
  .add('Empty state', () => (
    <FmpMain
      activeStams={[]}
      preparedStams={[]}
      historyStams={[]}
    />
  ))
  .add('With prepared stams', () => (
    <FmpMain
      activeStams={[]}
      preparedStams={preparedStams}
      historyStams={[]}
    />
  ));

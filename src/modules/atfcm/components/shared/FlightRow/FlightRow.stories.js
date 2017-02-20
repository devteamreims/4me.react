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

storiesOf('atfcm.Fmp.StamCard.FlightRow', module)
  .addDecorator(story => (
    <Card>
      <CardText>{story()}</CardText>
    </Card>
  ))
  .addDecorator(host({
    title: 'StamCard FlightRow',
    align: 'center middle',
    width: '100%',
  }))
  .add('Without mode', () => (
    <FlightRow
      flight={flight}
      onRequestEdit={action('request_edit')}
      onRequestDelete={action('request_delete')}
    />
  ))
  .add('With prepared mode', () => (
    <FlightRow
      flight={flight}
      mode="prepared"
      onRequestEdit={action('request_edit')}
      onRequestDelete={action('request_delete')}
    />
  ))
  .add('With active mode', () => (
    <FlightRow
      flight={flight}
      mode="active"
      onRequestEdit={action('request_edit')}
      onRequestDelete={action('request_delete')}
    />
  ))
  .add('With active mode and compact', () => (
    <FlightRow
      flight={flight}
      mode="active"
      compact={true}
      onRequestEdit={action('request_edit')}
      onRequestDelete={action('request_delete')}
    />
  ))

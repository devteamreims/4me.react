// @flow
import React from 'react';

import { storiesOf, action } from '@kadira/storybook';
import { host } from 'storybook-host';

import { StamCard } from './StamCard';

const props = {
  offloadSector: 'KR',
  stamId: 'running_fox',
  flights: [],
};

const flights = [{
  arcid: 'BAW123',
  constraint: {
    beacon: 'CLM',
    flightLevel: 360,
  },
  implementingSector: 'KD',
  onloadSector: 'KR',
}, {
  arcid: 'EZY1912',
  constraint: {
    beacon: 'KOTUN',
    flightLevel: 340,
  },
  implementingSector: 'KF',
  onloadSector: 'XR',
}];

storiesOf('atfcm.StamCard', module)
  .addDecorator(host({
    title: 'A StamCard as displayed for the FMP',
    align: 'center middle',
    width: '440px',
  }))
  .add('without flights', () => (
    <StamCard {...props} />
  ))
  .add('with flights', () => (
    <StamCard {...props} flights={flights} />
  ));

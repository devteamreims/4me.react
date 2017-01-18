// @flow
import React from 'react';

import { storiesOf, action } from '@kadira/storybook';
import { host } from 'storybook-host';

import { StamCard } from './StamCard';

const delay = t => {
  const p = new Promise(resolve => setTimeout(() => resolve(), t));
  return p;
};

const props = {
  offloadSector: 'KR',
  stamId: 'running_fox',
  flights: [],
  addFlight: () => delay(300).then(action('add_flight')),
  removeFlight: () => delay(300).then(action('remove_flight')),
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
  ))
  .add('with rejection on flight submission', () => {
    const addFlightWithRejection = flight =>
      props.addFlight(flight)
        .then(() => Promise.reject({invalidData: true}));

    return (
      <StamCard
        {...props}
        flights={flights}
        addFlight={addFlightWithRejection}
      />
    );
  });

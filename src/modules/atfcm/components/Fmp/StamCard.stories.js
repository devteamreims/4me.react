// @flow
import React from 'react';

import moment from 'moment';

import { storiesOf, action } from '@kadira/storybook';
import { host } from 'storybook-host';

import { StamCard } from './StamCard';

const delay = t => {
  const p = new Promise(resolve => setTimeout(() => resolve(), t));
  return p;
};

const props = {
  stam: {
    offloadSector: 'KR',
    stamId: 'running_fox',
    flights: [],
    sendTime: null,
  },
  onRequestAddFlight: () => delay(300).then(action('add_flight')),
  onRequestDeleteFlight: () => delay(300).then(action('delete_flight')),
  onRequestSend: () => delay(300).then(action('send_stam')),
  onRequestDelete: () => delay(300).then(action('delete_stam')),
};

const flights = [{
  arcid: 'BAW123',
  constraint: {
    beacon: 'CLM',
    flightLevel: 360,
  },
  implementingSector: 'KD',
  onloadSector: 'KR',
  sendTime: null,
}, {
  arcid: 'EZY1912',
  constraint: {
    beacon: 'KOTUN',
    flightLevel: 340,
  },
  implementingSector: 'KF',
  onloadSector: 'XR',
  sendTime: null,
}];

const stamWithFlights = Object.assign({}, props.stam, {flights});

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
    <StamCard {...props} stam={stamWithFlights} />
  ))
  .add('with sendTime', () => {
    const sendTime = moment.utc().add(5, 'minutes').toDate();

    return (
      <StamCard
        {...props}
        stam={Object.assign({}, stamWithFlights, {sendTime})}
      />
    )
  })
  .add('with rejection on flight submission', () => {
    const addFlightWithRejection = flight =>
      props.onRequestAddFlight(flight)
        .then(() => Promise.reject({invalidData: true}));

    return (
      <StamCard
        {...props}
        stam={stamWithFlights}
        onRequestAddFlight={addFlightWithRejection}
      />
    );
  });

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
    id: 'running_fox',
    flights: [],
    sendTime: null,
    archiveTime: null,
    createdAt: moment.utc().subtract(10, 'minutes').toDate(),
    updatedAt: moment.utc().subtract(10, 'minutes').toDate(),
  },
  loadingFlightIds: [],
  onRequestAddFlight: (...args) => delay(300).then(() => action('add_flight')(...args)),
  onRequestDelete: (...args) => action('delete_stam_request')(...args),
  onRequestSend: (...args) => action('send_stam_request')(...args),
  onRequestArchive: (...args) => action('archive_stam_request')(...args),
  deleteFlight: (...args) => action('delete_flight_request')(...args),
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
  .add('with loading prop', () => (
    <StamCard {...props} stam={stamWithFlights} loading={true} />
  ))
  .add('with sendTime in the future', () => {
    const sendTime = moment.utc().add(5, 'minutes').toDate();

    return (
      <StamCard
        {...props}
        stam={Object.assign({}, stamWithFlights, {sendTime})}
      />
    );
  })
  .add('with sendTime in the past', () => {
    const sendTime = moment.utc().subtract(5, 'minutes').toDate();

    return (
      <StamCard
        {...props}
        stam={Object.assign({}, stamWithFlights, {sendTime})}
      />
    );
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
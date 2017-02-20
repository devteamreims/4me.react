// @flow
import React from 'react';

import moment from 'moment';

import { storiesOf, action } from '@kadira/storybook';

import { host } from 'storybook-host';

import { StamCard } from './StamCard';

const getProps = () => ({
  // Regular Props
  stam: {
    offloadSector: 'KR',
    id: 'running_fox',
    flights: [],
    sendTime: null,
    archiveTime: null,
    createdAt: moment.utc().subtract(10, 'minutes').toDate(),
    updatedAt: moment.utc().subtract(10, 'minutes').toDate(),
  },
  onRequestAddFlight: action('request_add_flight'),
  onRequestDelete: action('requete_delete'),
  onRequestSend: action('request_send'),
  onRequestArchive: action('request_archive'),
  readOnly: false,

  // StateProps
  loadingFlightIds: [],

  // DispatchProps
  onRequestShowFlightForm: action('request_show_flight_form'),
  onRequestDeleteFlight: action('request_delete_flight'),
});

const flights = [{
  id: 'baw123',
  arcid: 'BAW123',
  constraint: {
    beacon: 'CLM',
    flightLevel: 360,
  },
  implementingSector: 'KD',
  onloadSector: 'KR',
}, {
  id: 'ezy1912',
  arcid: 'EZY1912',
  constraint: {
    beacon: 'KOTUN',
    flightLevel: 340,
  },
  implementingSector: 'KF',
  onloadSector: 'XR',
}];

const getStamWithFlights = () => Object.assign({}, getProps().stam, {flights});

storiesOf('atfcm.Fmp.StamCard', module)
  .addDecorator(host({
    title: 'A StamCard',
    align: 'center middle',
    width: '440px',
  }))
  .add('without flights', () => (
    <StamCard {...getProps()} />
  ))
  .add('with flights', () => (
    <StamCard {...getProps()} stam={getStamWithFlights()} />
  ))
  .add('with BAW123 loading', () => (
    <StamCard
      {...getProps()}
      stam={getStamWithFlights()}
      loadingFlightIds={['baw123']}
    />
  ))
  .add('with loading prop', () => (
    <StamCard {...getProps()} stam={getStamWithFlights()} loading={true} />
  ))
  .add('with sendTime in the future', () => {
    const sendTime = moment.utc().add(5, 'minutes').toDate();

    return (
      <StamCard
        {...getProps()}
        stam={Object.assign({}, getStamWithFlights(), {sendTime})}
      />
    );
  })
  .add('with sendTime in the past', () => {
    const sendTime = moment.utc().subtract(5, 'minutes').toDate();

    return (
      <StamCard
        {...getProps()}
        stam={Object.assign({}, getStamWithFlights(), {sendTime})}
      />
    );
  });

const getPropsReadOnly = () => Object.assign({}, getProps(), {
  onRequestAddFlight: undefined,
  onRequestDelete: undefined,
  onRequestSend: undefined,
  onRequestArchive: undefined,
  onRequestDeleteFlight: undefined,
  onRequestShowFlightForm: undefined,
});

storiesOf('atfcm.shared.StamCard (readOnly)', module)
  .addDecorator(host({
    title: 'A StamCard',
    align: 'center middle',
    width: '440px',
  }))
  .add('without flights', () => (
    <StamCard {...getPropsReadOnly()} />
  ))
  .add('with flights', () => (
    <StamCard {...getPropsReadOnly()} stam={getStamWithFlights()} />
  ))
  .add('with BAW123 loading', () => (
    <StamCard
      {...getPropsReadOnly()}
      stam={getStamWithFlights()}
      loadingFlightIds={['baw123']}
    />
  ))
  .add('with loading prop', () => (
    <StamCard {...getPropsReadOnly()} stam={getStamWithFlights()} loading={true} />
  ))
  .add('with sendTime in the future', () => {
    const sendTime = moment.utc().add(5, 'minutes').toDate();

    return (
      <StamCard
        {...getPropsReadOnly()}
        stam={Object.assign({}, getStamWithFlights(), {sendTime})}
      />
    );
  })
  .add('with sendTime in the past', () => {
    const sendTime = moment.utc().subtract(5, 'minutes').toDate();

    return (
      <StamCard
        {...getPropsReadOnly()}
        stam={Object.assign({}, getStamWithFlights(), {sendTime})}
      />
    );
  });

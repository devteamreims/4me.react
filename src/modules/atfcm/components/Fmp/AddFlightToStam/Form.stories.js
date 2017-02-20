// @flow
import React, { Component } from 'react';

import { storiesOf, action } from '@kadira/storybook';
import { host } from 'storybook-host';

import { Card, CardText } from 'material-ui/Card';

import { Form } from './Form';

const flight = {
  arcid: 'BAW123',
  constraint: {
    beacon: 'CLM',
    flightLevel: 360,
  },
  implementingSector: 'KD',
  onloadSector: 'KR',
};

const invalidFlight = {
  arcid: 'aze---',
  constraint: {
    beacon: 'invalid beacon',
    flightLevel: 'string',
  },
  implementingSector: 'NONEXISTENT',
  onloadSector: 'NONEXISTENT',
};

const autocompleteFlights = [
  'AFR1234',
  'BAW146',
  'EZY123',
];

const getBasicProps = (): Object => ({
  autocompleteFlights,
  isAutocompleteLoading: false,
  autocompleteError: null,
  requestAutocomplete: action('request_autocomplete'),
  onValid: action('valid'),
  onInvalid: action('invalid'),
  onChange: action('change'),
  onSubmit: action('submit'),
});

storiesOf('atfcm.Fmp.AddFlightToStam.Form', module)
  .addDecorator(story => (
    <Card>
      <CardText>{story()}</CardText>
    </Card>
  ))
  .addDecorator(host({
    title: 'A form used to add a flight to a STAM',
    align: 'center middle',
    width: '440px',
  }))
  .add('pristine', () => (
    <Form
      {...getBasicProps()}
    />
  ))
  .add('with flight', () => (
    <Form
      flight={flight}
      {...getBasicProps()}
    />
  ))
  .add('with autocomplete error', () => (
    <Form
      {...getBasicProps()}
      autocompleteError="Autocomplete error !"
    />
  ))
  .add('with invalid flight (local validation)', () => (
    <Form
      flight={invalidFlight}
      {...getBasicProps()}
    />
  ))
  .add('with invalid flight (remote validation)', () => (
    <Form
      globalError="This is a global error"
      fieldErrors={{
        implementingSector: 'implementingSector invalid',
        'constraint.beacon': 'constraint.beacon invalid',
      }}
      flight={invalidFlight}
      {...getBasicProps()}
    />
  ))
  .add('submitting', () => (
    <Form
      flight={flight}
      loading={true}
      {...getBasicProps()}
    />
  ));

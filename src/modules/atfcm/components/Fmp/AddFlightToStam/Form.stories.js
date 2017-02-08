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

storiesOf('atfcm.AddFlightToStam.Form', module)
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
      onValid={action('valid')}
      onInvalid={action('invalid')}
      onChange={action('change')}
      onSubmit={action('submit')}
    />
  ))
  .add('with flight', () => (
    <Form
      onValid={action('valid')}
      onInvalid={action('invalid')}
      onChange={action('change')}
      onSubmit={action('submit')}
      flight={flight}
    />
  ))
  .add('invalid', () => (
    <Form
      onValid={action('valid')}
      onInvalid={action('invalid')}
      onChange={action('change')}
      onSubmit={action('submit')}
      flight={invalidFlight}
    />
  ))
  .add('submitting', () => (
    <Form
      onValid={action('valid')}
      onInvalid={action('invalid')}
      onChange={action('change')}
      onSubmit={action('submit')}
      flight={flight}
      loading={true}
    />
  ));

// @flow
import React, { Component } from 'react';

import { storiesOf, action } from '@kadira/storybook';
import { host } from 'storybook-host';

import { Card, CardText } from 'material-ui/Card';

import { AddFlightToStam } from './AddFlightToStam';

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

class ExternalValidationWrapper extends Component {
  state: {
    validationErrors: ?Object,
  };

  constructor(props) {
    super(props);
    this.state = {
      validationErrors: {
        implementingSector: 'Invalid sector !',
      }
    };
  }

  formRef = null;
  validationTimeout = null;

  handleSubmit = (data, resetModel, invalidateModel) => {
    clearTimeout(this.validationTimeout);
    this.validationTimeout = setTimeout(() => {
      invalidateModel({
        'constraint.flightLevel': 'Wrong here !',
        implementingSector: 'Wrong here !',
      });
      this.validationTimeout = null;
    }, 800);
  };

  performSubmit = () => {
    if(this.formRef && this.formRef.submit) {
      this.formRef.submit();
    }
  };

  render() {
    return (
      <div>
        <AddFlightToStam
          ref={formRef => {
            this.formRef = formRef;
          }}
          onValid={action('valid')}
          onInvalid={action('invalid')}
          onSubmit={this.handleSubmit}
          flight={flight}
        />
        <br />
        <button onClick={this.performSubmit}>GENERATE ERRORS</button>
      </div>
    );
  }
}

storiesOf('atfcm.AddFlightToStam', module)
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
    <AddFlightToStam
      onValid={action('valid')}
      onInvalid={action('invalid')}
      onChange={action('change')}
      onSubmit={action('submit')}
    />
  ))
  .add('with flight', () => (
    <AddFlightToStam
      onValid={action('valid')}
      onInvalid={action('invalid')}
      onChange={action('change')}
      onSubmit={action('submit')}
      flight={flight}
    />
  ))
  .add('invalid', () => (
    <AddFlightToStam
      onValid={action('valid')}
      onInvalid={action('invalid')}
      onChange={action('change')}
      onSubmit={action('submit')}
      flight={invalidFlight}
    />
  ))
  .add('submitting', () => (
    <AddFlightToStam
      onValid={action('valid')}
      onInvalid={action('invalid')}
      onChange={action('change')}
      onSubmit={action('submit')}
      flight={flight}
      loading={true}
    />
  ))
  .add('with external validation', () => <ExternalValidationWrapper />);

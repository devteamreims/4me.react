// @flow
import React, { Component } from 'react';
import R from 'ramda';

import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsyAutoComplete from 'formsy-material-ui/lib/FormsyAutoComplete';
import AutoComplete from 'material-ui/AutoComplete';

import { Form } from 'formsy-react';

type ResetModel = () => void;
type InvalidateModel = (Object) => void;

type Props = {
  flight?: any,
  loading?: boolean,
  onValid?: () => void,
  onInvalid?: () => void,
  onChange?: () => void,
  onSubmit?: (Object, ResetModel, InvalidateModel) => void, // Useful to signal parent we have a submit (enter key)
  validationErrors?: Object,
  style?: Object,
};

import { sectors } from '../../../../shared/env';

// A bunch of validation functions
const doesSectorExist = sector => {
  if(typeof sector !== 'string') {
    return false;
  }

  return sectors.getElementarySectors().includes(sector);
};

const checkSectorExistence = (values: Object, value: mixed) => {
  if(!value) {
    return true;
  }

  return doesSectorExist(R.toUpper(value)) ? true : 'This sector does not exist';
};

export class AddFlightToStam extends Component {
  props: Props;
  state: {
    disableSubmit: boolean,
    disableDiscard: boolean,
    implementingSector: ?string,
    onloadSector: ?string,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      disableSubmit: true,
      disableDiscard: true,
      implementingSector: null,
      onloadSector: null,
    };
  }

  form = null;

  handleImplementingSectorSelect = (chosenSector: string) => {
    // This setState will trigger a rerender, given us the opportunity to tweak validation
    // and data source for the rest of the fields.
    this.setState({implementingSector: chosenSector});
  };

  handleOnloadSectorSelect = (chosenSector: string) => {
    this.setState({onloadSector: chosenSector});
  };

  handleValid = () => {
    const { onValid } = this.props;

    if(onValid) {
      onValid();
    }
  };

  handleInvalid = () => {
    const { onInvalid } = this.props;

    if(onInvalid) {
      onInvalid();
    }
  };

  handleChange = () => {
    const { onChange } = this.props;

    if(onChange && this.form) {
      onChange(this.form.getModel());
    }
  };

  handleSubmit = (data: Object, resetModel: () => void, updateInputsWithError: (Object) => void) => {
    const { onSubmit } = this.props;

    if(onSubmit) {
      onSubmit(data, resetModel, updateInputsWithError);
    }
  };

  submit = () => {
    if(this.form) {
      this.form.submit();
    }
  };

  render() {
    const {
      flight,
      loading,
      style,
      validationErrors,
    } = this.props;

    const {
      implementingSector,
      onloadSector,
    } = this.state;

    return (
      <div style={style}>
        <div>{flight ? 'Edit flight' : 'Add flight'}</div>
        <Form
          onValid={this.handleValid}
          onInvalid={this.handleInvalid}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          validationErrors={validationErrors}
          ref={form => {
            this.form = form;
          }}
        >
          <FormsyText
            name="arcid"
            required={true}
            disabled={loading}
            floatingLabelText="Callsign"
            value={flight && flight.arcid}
            validations="isAlphanumeric"
            validationError="Please enter a valid callsign"
            updateImmediately={true}
          />
          <FormsyAutoComplete
            name="implementingSector"
            required={true}
            disabled={loading}
            floatingLabelText="IMPLEMENTING Sector"
            validations={{
              checkSectorExistence,
            }}
            onNewRequest={this.handleImplementingSectorSelect}
            validationError="Please enter a valid elementary sector"
            value={implementingSector || (flight && flight.implementingSector)}
            searchText={implementingSector || (flight && flight.implementingSector)}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={sectors.getElementarySectors()}
          />
          <FormsyText
            name="constraint.beacon"
            required={true}
            disabled={loading}
            floatingLabelText="Beacon"
            value={flight && flight.constraint && flight.constraint.beacon}
            validations="isAlpha,minLength:2,maxLength:5"
            validationError="Please enter a valid beacon"
            updateImmediately={true}
          />
          <FormsyText
            name="constraint.flightLevel"
            required={true}
            disabled={loading}
            floatingLabelText="FL at beacon"
            value={flight && flight.constraint && `${flight.constraint.flightLevel}`}
            validations="isInt,isLength:3"
            validationError="Please enter a valid FL"
            updateImmediately={true}
          />
          <FormsyAutoComplete
            name="onloadSector"
            required={true}
            disabled={loading}
            floatingLabelText="ONLOAD Sector"
            validations={{
              checkSectorExistence,
            }}
            onNewRequest={this.handleOnloadSectorSelect}
            validationError="Please enter a valid elementary sector"
            value={onloadSector || (flight && flight.onloadSector)}
            searchText={onloadSector || (flight && flight.onloadSector)}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={sectors.getElementarySectors()}
          />
        </Form>
      </div>
    );
  }
}

export default AddFlightToStam;

// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsyAutoComplete from 'formsy-material-ui/lib/FormsyAutoComplete';
import AutoComplete from 'material-ui/AutoComplete';
import { red500 } from 'material-ui/styles/colors';
import Formsy from 'formsy-react';
import LinearProgress from 'material-ui/LinearProgress';

import FormGlobalError from '../../shared/FormGlobalError';
import FormsyHidden from './FormsyHidden';

type Props = {
  flight?: ?Object,
  loading?: boolean,
  onValid?: () => void,
  onInvalid?: () => void,
  onChange?: () => void,
  onSubmit?: (Object) => void, // Useful to signal parent we have a submit (enter key)
  fieldErrors?: ?{[key: string]: string},
  globalError?: ?string,
  style?: Object,
};

import { sectors } from '../../../../../shared/env';
import { checkSectorExistence } from '../../../shared/validations';

export class Form extends Component {
  props: Props & StateProps & DispatchProps;
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

  componentDidMount() {
    const {
      requestAutocomplete,
    } = this.props;

    if(typeof requestAutocomplete !== 'function') {
      return;
    }

    requestAutocomplete();
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

  handleSubmit = (data: Object) => {
    const { onSubmit } = this.props;

    if(onSubmit) {
      onSubmit(data);
    }
  };

  // Ref plumbing to allow external submission
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
      fieldErrors,
      globalError,
      autocompleteError,
      autocompleteFlights,
      isAutocompleteLoading,
    } = this.props;

    const {
      implementingSector,
      onloadSector,
    } = this.state;


    return (
      <div style={style}>
        {autocompleteError &&
          <FormGlobalError error={`Autocompletion: ${autocompleteError}`} />
        }
        <FormGlobalError error={globalError} />
        <Formsy.Form
          onValid={this.handleValid}
          onInvalid={this.handleInvalid}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          validationErrors={fieldErrors}
          ref={form => {
            this.form = form;
          }}
        >
          {flight && flight.id &&
            <FormsyHidden
              name="id"
              value={flight.id}
            />
          }
          <FormsyAutoComplete
            name="arcid"
            autoComplete="off"
            required={true}
            disabled={loading}
            floatingLabelText="Callsign"
            value={flight && flight.arcid}
            searchText={(flight && flight.arcid) || ''}
            validations="isAlphanumeric"
            validationError="Please enter a valid callsign"
            fullWidth={true}
            updateImmediately={true}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={autocompleteFlights}
          />
          <FormsyAutoComplete
            name="implementingSector"
            autoComplete="off"
            required={true}
            disabled={loading}
            floatingLabelText="IMPLEMENTING Sector"
            validations={{
              checkSectorExistence,
            }}
            onNewRequest={this.handleImplementingSectorSelect}
            validationError="Please enter a valid elementary sector"
            value={implementingSector || (flight && flight.implementingSector)}
            searchText={implementingSector || (flight && flight.implementingSector) || ''}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={sectors.getElementarySectors()}
            openOnFocus={true}
            fullWidth={true}
          />
          <FormsyText
            name="constraint.beacon"
            autoComplete="off"
            required={true}
            disabled={loading}
            floatingLabelText="Beacon"
            value={flight && flight.constraint && flight.constraint.beacon}
            validations="isAlpha,minLength:2,maxLength:5"
            validationError="Please enter a valid beacon"
            updateImmediately={true}
            fullWidth={true}
          />
          <FormsyText
            name="constraint.flightLevel"
            required={true}
            autoComplete="off"
            disabled={loading}
            floatingLabelText="FL at beacon"
            value={flight && flight.constraint && `${flight.constraint.flightLevel}`}
            validations="isInt,isLength:3"
            validationError="Please enter a valid FL"
            updateImmediately={true}
            fullWidth={true}
          />
          <FormsyAutoComplete
            name="onloadSector"
            autoComplete="off"
            required={true}
            disabled={loading}
            floatingLabelText="ONLOAD Sector"
            validations={{
              checkSectorExistence,
            }}
            onNewRequest={this.handleOnloadSectorSelect}
            validationError="Please enter a valid elementary sector"
            value={onloadSector || (flight && flight.onloadSector)}
            searchText={onloadSector || (flight && flight.onloadSector) || ''}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={sectors.getElementarySectors()}
            openOnFocus={true}
            fullWidth={true}
          />
        </Formsy.Form>
      </div>
    );
  }
}

type StateProps = {
  autocompleteFlights: Array<string>,
  isAutocompleteLoading: boolean,
  autocompleteError: ?string,
};

import {
  isLoading as isAutocompleteLoading,
  getFlights as getAutocompleteFlights,
  getError as getAutocompleteError,
} from '../../../reducers/ui/autocomplete';

const mapStateToProps = (state) => ({
  isAutocompleteLoading: isAutocompleteLoading(state),
  autocompleteFlights: getAutocompleteFlights(state),
  autocompleteError: getAutocompleteError(state),
});

type DispatchProps = {
  requestAutocomplete: () => void,
};

import {
  request as requestAutocomplete,
} from '../../../actions/autocomplete';

const mapDispatchToProps = {
  requestAutocomplete,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Form);

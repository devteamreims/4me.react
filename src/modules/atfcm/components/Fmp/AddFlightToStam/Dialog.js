// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FormsyAutoComplete from 'formsy-material-ui/lib/FormsyAutoComplete';
import AutoComplete from 'material-ui/AutoComplete';

import Form from './Form';

import { sectors } from '../../../../../shared/env';
import { checkSectorExistence } from '../../../shared/validations';

type Props = {};

type State = {
  disableButtons: boolean,
};

export class AddFlightToStamDialog extends Component {
  props: Props & StateProps & DispatchProps;
  state: State;
  form: *;

  state = {
    disableButtons: false,
  };

  handleOnValid = () => {
    this.setState({
      disableButtons: false,
    });
  };

  handleOnInvalid = () => {
    this.setState({
      disableButtons: true,
    });
  };

  handleOnChange = () => {
    const { onChange } = this.props;

    if(typeof onChange !== 'function') {
      return;
    }

    onChange();
  };

  triggerSubmit = () => {
    if(!this.form || typeof this.form.submit !== 'function') {
      return;
    }

    this.form.submit();
  };

  handleSubmit = (data: Object) => {
    const {
      commitFlight,
      stamId,
      flight,
    } = this.props;

    if(typeof commitFlight !== 'function' || !stamId) {
      return;
    }

    commitFlight(stamId, data);
  };

  handleRequestClose = () => {
    const {
      hideDialog,
      loading,
    } = this.props;

    if(typeof hideDialog !== 'function') {
      return;
    }

    // Do not close the dialog when its loading
    if(loading) {
      return;
    }

    hideDialog();
  }

  renderActions() {
    const {
      loading,
    } = this.props;

    const {
      disableButtons,
    } = this.state;

    const buttonLabel = loading ? 'Saving ...' : 'Save';


    return [
      <FlatButton
        disabled={loading}
        label="cancel"
        onClick={this.handleRequestClose}
      />,
      <FlatButton
        disabled={loading || disableButtons}
        type="submit"
        onClick={this.triggerSubmit}
        label={buttonLabel}
      />,
    ];
  }

  render() {
    const {
      open,
      loading,
      globalError,
      fieldErrors,
      stamId,
      flight,
    } = this.props;

    // Here, if we don't have a stamId, we should render nothing
    // However, this will break material-ui Dialog animations
    // Solution is to force close the dialog when stamId is null
    const isDialogOpen = !(stamId === null) || open;

    return (
      <Dialog
        open={isDialogOpen}
        onRequestClose={this.handleRequestClose}
        actions={this.renderActions()}
        title={flight ? 'Edit flight' : 'Add flight'}
        autoScrollBodyContent={true}
        modal={true}
      >
        {isDialogOpen &&
          <Form
            onValid={this.handleOnValid}
            onInvalid={this.handleOnInvalid}
            onSubmit={this.handleSubmit}
            onChange={this.handleOnChange}
            ref={form => {
              this.form = form;
            }}
            flight={flight}
            globalError={globalError}
            fieldErrors={fieldErrors}
          />
        }
      </Dialog>
    );
  }
}

type StateProps = {
  loading: boolean,
  open: boolean,
  globalError: ?string,
  stamId: *,
  fieldErrors: null | {[key: string]: string},
  flight: *,
};

import {
  isVisible,
  isLoading,
  getErrorMessage,
  getFieldErrors,
  getFlightId,
  getStamId,
} from '../../../reducers/ui/addFlightModal';

import { getFlightById } from '../../../reducers/entities/flights';

const mapStateToProps = state => {
  let flight = null;
  const flightId = getFlightId(state);
  if(flightId) {
    flight = getFlightById(state, flightId);
  }

  return {
    open: isVisible(state),
    loading: isLoading(state),
    stamId: getStamId(state),
    flight,
    globalError: getErrorMessage(state),
    fieldErrors: getFieldErrors(state),
  };
};

import {
  hideDialog,
  touchForm,
  commitFlight,
} from '../../../actions/flight';

type DispatchProps = {
  onChange: () => void,
  hideDialog: () => void,
  commitFlight: (*) => void,
};

const mapDispatchToProps = {
  onChange: touchForm,
  hideDialog,
  commitFlight,
};


export default connect(mapStateToProps, mapDispatchToProps)(AddFlightToStamDialog);

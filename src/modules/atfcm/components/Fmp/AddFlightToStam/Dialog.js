// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Form from './Form';


type Props = StateProps & DispatchProps;

type State = {
  disableButtons: boolean,
};

import {
  hideDialog,
  touchForm,
  commitFlight,
} from '../../../actions/flight';

class AddFlightToStamDialog extends Component {
  props: Props;
  state: State;

  form: mixed;

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
    const { dispatch } = this.props;

    dispatch(touchForm());
  };

  triggerSubmit = () => {
    if(!this.form) {
      return;
    }

    // Now we have to workaround react-redux wrapping functions
    // Ref could point to the connected component instead of the real component
    let trigger = () => {};


    if(typeof this.form.submit === 'function') {
      // Easy one, form is readly accessible
      trigger = this.form.submit;
    } else if(
      this.form.getWrappedInstance &&
      typeof this.form.getWrappedInstance === 'function' &&
      typeof this.form.getWrappedInstance().submit === 'function'
    ) {
      trigger = this.form.getWrappedInstance().submit;
    }

    trigger();
  };

  handleSubmit = (data: Object) => {
    const {
      dispatch,
      stamId,
    } = this.props;

    if(typeof dispatch !== 'function' || !stamId) {
      return;
    }


    dispatch(commitFlight(stamId, data));
  };

  handleRequestClose = () => {
    const {
      dispatch,
      loading,
    } = this.props;

    if(typeof dispatch !== 'function') {
      return;
    }

    // Do not close the dialog when its loading
    if(loading) {
      return;
    }

    dispatch(hideDialog());
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

import type { StamId, Flight, FieldErrors } from '../../../types';

type StateProps = {
  loading: boolean,
  open: boolean,
  globalError: ?string,
  stamId: ?StamId,
  fieldErrors: ?FieldErrors,
  flight: ?Flight,
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

import type { Dispatch, RootState } from '../../../../../store';
import type { Connector } from 'react-redux';

const mapStateToProps = (state: RootState) => {
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

type DispatchProps = {
  dispatch: Dispatch,
};

const mapDispatchToProps = (dispatch: Dispatch) => ({dispatch});

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default connector(AddFlightToStamDialog);

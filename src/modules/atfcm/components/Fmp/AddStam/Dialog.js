// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';

import FormGlobalError from '../../shared/FormGlobalError';

import FormsyAutoComplete from 'formsy-material-ui/lib/FormsyAutoComplete';
import AutoComplete from 'material-ui/AutoComplete';
import { Form } from 'formsy-react';

import { sectors } from '../../../../../shared/env';


type Props = StateProps & DispatchProps;

type State = {
  disableButtons: boolean,
};

export class AddStamDialog extends Component {
  props: Props;
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
    const { touchForm } = this.props;

    if(typeof touchForm !== 'function') {
      return;
    }

    touchForm();
  };

  triggerSubmit = () => {
    if(!this.form || typeof this.form.submit !== 'function') {
      return;
    }

    this.form.submit();
  };

  handleSubmit = (data: mixed) => {
    const { commitStam } = this.props;

    if(typeof commitStam !== 'function') {
      return;
    }

    commitStam(data);
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
    } = this.props;

    return (
      <Dialog
        open={open}
        onRequestClose={this.handleRequestClose}
        actions={this.renderActions()}
        title="Create new STAM"
        autoScrollBodyContent={true}
        modal={true}
      >
        <FormGlobalError error={globalError} />
        <Form
          onValid={this.handleOnValid}
          onInvalid={this.handleOnInvalid}
          onChange={this.handleOnChange}
          onSubmit={this.handleSubmit}
          validationErrors={fieldErrors}
          ref={form => {
            this.form = form;
          }}
        >
          <FormsyAutoComplete
            name="offloadSector"
            autoComplete="off"
            required={true}
            disabled={loading}
            openOnFocus={true}
            floatingLabelText="OFFLOAD Sector"
            validationError="Please enter a valid elementary sector"
            dataSource={sectors.getElementarySectors()}
            filter={AutoComplete.caseInsensitiveFilter}
          />
        </Form>
      </Dialog>
    );
  }
}

import type { RootState, Dispatch } from '../../../../../store';
import type { Connector } from 'react-redux';
import type { FieldErrors } from '../../../types';

type StateProps = {
  open: boolean,
  loading: boolean,
  globalError: ?string,
  fieldErrors: ?FieldErrors,
};

import {
  isVisible,
  isLoading,
  getErrorMessage,
  getFieldErrors,
} from '../../../reducers/ui/addStamModal';

const mapStateToProps = (state: RootState) => {
  return {
    open: isVisible(state),
    loading: isLoading(state),
    globalError: getErrorMessage(state),
    fieldErrors: getFieldErrors(state),
  };
};

type DispatchProps = {
  hideDialog: Function,
  touchForm: Function,
  commitStam: Function,
};

import {
  commitStam,
  hideDialog,
  touchForm,
} from '../../../actions/stam';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  commitStam: (...args) => dispatch(commitStam(...args)),
  hideDialog: () => dispatch(hideDialog()),
  touchForm: () => dispatch(touchForm()),
});


const connector: Connector<{}, Props> = connect(mapStateToProps, mapDispatchToProps);

export default connector(AddStamDialog);

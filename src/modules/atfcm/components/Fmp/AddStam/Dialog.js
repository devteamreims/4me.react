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
import { checkSectorExistence } from '../../../shared/validations';

type Props = {
  open: boolean,
  onRequestClose: () => *,
  addStam: () => *,
};

type State = {
  disableButtons: boolean,
};

export class AddStamDialog extends Component {
  props: Props & StateProps;
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
    const { addStam } = this.props;

    if(typeof addStam !== 'function') {
      return;
    }

    addStam(data);
  };

  handleRequestClose = () => {
    const {
      onRequestClose,
      loading,
    } = this.props;

    if(typeof onRequestClose !== 'function') {
      return;
    }

    // Do not close the dialog when its loading
    if(loading) {
      return;
    }

    onRequestClose();
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
            validations={{
              checkSectorExistence,
            }}
            validationError="Please enter a valid elementary sector"
            dataSource={sectors.getElementarySectors()}
            filter={AutoComplete.caseInsensitiveFilter}
          />
        </Form>
      </Dialog>
    );
  }
}

type StateProps = {
  isLoading: boolean,
  globalError: ?string,
  fieldErrors: null | {[key: string]: string},
  onChange: () => void,
};

import {
  isLoading,
  getErrorMessage,
  getFieldErrors,
} from '../../../reducers/ui/addStamModal';

const mapStateToProps = state => ({
  loading: isLoading(state),
  globalError: getErrorMessage(state),
  fieldErrors: getFieldErrors(state),
});

import {
  touchDialogForm,
} from '../../../actions/stam';

const mapDispatchToProps = {
  onChange: touchDialogForm,
};


export default connect(mapStateToProps, mapDispatchToProps)(AddStamDialog);

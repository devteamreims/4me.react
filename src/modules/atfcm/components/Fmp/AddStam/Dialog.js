// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';

import FormsyAutoComplete from 'formsy-material-ui/lib/FormsyAutoComplete';
import AutoComplete from 'material-ui/AutoComplete';
import { Form } from 'formsy-react';

import { sectors } from '../../../../../shared/env';
import { checkSectorExistence } from '../../../shared/validations';

type Props = {
  open: boolean,
  loading: boolean,
  onRequestClose: () => *,
  addStam: () => *,
} & StateProps;

type State = {
  disableButtons: boolean,
};

export class AddStamDialog extends Component {
  props: Props;
  state: State;

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

  handleCommitStam = () => {
    const { addStam } = this.props;

    if(typeof addStam !== 'function') {
      return;
    }

    const sampleStam = {
      offloadSector: 'KR',
      flights: [],
    };

    addStam(sampleStam);
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
      onRequestClose,
    } = this.props;

    const {
      disableButtons,
    } = this.state;

    const buttonLabel = loading ? 'Saving ...' : 'Save';


    return [
      <FlatButton
        disabled={loading}
        label="cancel"
        onClick={onRequestClose}
      />,
      <FlatButton
        disabled={loading || disableButtons}
        type="submit"
        onClick={this.handleCommitStam}
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
      >
        <div
          style={{
            marginTop: 10,
            color: red500,
          }}
        >
          {globalError}
        </div>
        <Form
          onValid={this.handleOnValid}
          onInvalid={this.handleOnInvalid}
          onChange={this.handleOnChange}
          validationErrors={fieldErrors}
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

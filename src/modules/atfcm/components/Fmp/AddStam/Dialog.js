// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
};

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
        primary={true}
        label={buttonLabel}
      />,
    ];
  }

  render() {
    const {
      open,
      onRequestClose,
      loading,
    } = this.props;

    return (
      <Dialog
        open={open}
        onRequestClose={onRequestClose}
        actions={this.renderActions()}
        title="Create new STAM"
        autoScrollBodyContent={true}
      >
        <Form
          onValid={this.handleOnValid}
          onInvalid={this.handleOnInvalid}
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

import {
  isLoading,
} from '../../../reducers/ui/addStamModal';

const mapStateToProps = state => ({
  loading: isLoading(state),
});


export default connect(mapStateToProps)(AddStamDialog);

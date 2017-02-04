// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';

import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsyAutoComplete from 'formsy-material-ui/lib/FormsyAutoComplete';
import AutoComplete from 'material-ui/AutoComplete';

import { Form } from 'formsy-react';

type Props = {
  open: boolean,
  loading: boolean,
  onRequestClose: () => *,
  addStam: () => *,
};

export class AddStamDialog extends Component {
  props: Props;

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
      >
        <button
          onClick={this.handleCommitStam}
          disabled={loading}
        >Click me !</button>
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

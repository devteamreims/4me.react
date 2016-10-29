import React, {Component} from 'react';
import {connect} from 'react-redux';

import ErrorModal from '../../core/components/ErrorModal';
import CwpDialog from './CwpDialog';
import ControlRoom from './ControlRoom';

class MappingRoot extends Component {
  handleRequestClose = (event) => { // eslint-disable-line no-unused-vars
    const {
      closeDialog,
    } = this.props;

    closeDialog();
  };

  render() {
    const {
      isErrored,
      isDialogOpen,
      dialogCwpId,
    } = this.props;

    if(isErrored) {
      return (
        <ErrorModal
          title="MAPPING unavailable"
        >
          Could not connect to mapping backend
        </ErrorModal>
      );
    }

    return (
      <div>
        <CwpDialog
          open={isDialogOpen}
          modal={false}
          cwpId={dialogCwpId}
          onRequestClose={this.handleRequestClose}
        />
        <ControlRoom />
      </div>
    );
  }
}

import {
  isOpen,
  getCwpId as getDialogCwpId,
} from '../selectors/dialog';

import {
  isErrored,
} from '../selectors/status';

const mapStateToProps = (state) => {
  const isDialogOpen = isOpen(state);
  const dialogCwpId = getDialogCwpId(state);

  return {
    isDialogOpen,
    dialogCwpId,
    isErrored: isErrored(state),
  };
};

import {
  close as closeDialog
} from '../actions/dialog';

const mapDispatchToProps = {
  closeDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(MappingRoot);

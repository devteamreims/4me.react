import React, { Component } from 'react';
import { connect } from 'react-redux';

import CwpButton from './CwpButton';
import RoomStatus from './RoomStatus';

import ControlRoomLayout from './ControlRoomLayout';

class ControlRoom extends Component {
  componentWillUnmount() {
    const {
      closeDialog,
    } = this.props;

    closeDialog();
  }

  render() {
    return (
      <ControlRoomLayout
        cwpButtonComponent={<CwpButton style={{margin: 5}} />}
        roomStatusComponent={<RoomStatus style={{margin: '0 100px'}} />}
      />
    );
  }
}

import {
  close,
} from '../actions/dialog';

const mapDispatchToProps = {
  closeDialog: close,
};

export default connect(null, mapDispatchToProps)(ControlRoom);

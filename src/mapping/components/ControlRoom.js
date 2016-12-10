import React, { Component } from 'react';
import { connect } from 'react-redux';

import CwpButton from './CwpButton';
import RoomStatus from './RoomStatus';

import getEnv from '4me.env';
const {
  getControlRoomLayout,
} = getEnv(window.FOURME_CONFIG.FOURME_ENV).components;

const ControlRoomLayout = getControlRoomLayout();

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
        cwpButton={<CwpButton style={{margin: 5}} />}
        roomStatus={<RoomStatus style={{margin: '0 100px'}} />}
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

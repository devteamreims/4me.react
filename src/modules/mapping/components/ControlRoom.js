// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CwpButton from './CwpButton';
import RoomStatus from './RoomStatus';

import { components as envComponents } from '../../../shared/env';
const ControlRoomLayout = envComponents.getControlRoomLayout();

type Props = {
  closeDialog: Function,
};

class ControlRoom extends Component {
  props: Props;

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

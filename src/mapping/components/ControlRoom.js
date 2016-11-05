import React, { Component } from 'react';

import CwpButton from './CwpButton';
import RoomStatus from './RoomStatus';

import ControlRoomLayout from './ControlRoomLayout';

class ControlRoom extends Component {
  render() {
    return (
      <ControlRoomLayout
        cwpButtonComponent={CwpButton}
        roomStatusComponent={RoomStatus}
      />
    );
  }
}

export default ControlRoom;

import React, { Component } from 'react';

import CwpButton from './CwpButton';
import RoomStatus from './RoomStatus';

import ControlRoomLayout from './ControlRoomLayout';

class ControlRoom extends Component {
  render() {
    return (
      <ControlRoomLayout
        cwpButtonComponent={<CwpButton style={{margin: 5}} />}
        roomStatusComponent={<RoomStatus style={{margin: '0 100px'}} />}
      />
    );
  }
}

export default ControlRoom;

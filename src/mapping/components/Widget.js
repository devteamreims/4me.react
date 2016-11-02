import React from 'react';

import Widget from '../../core/components/Dashboard/Widget';
import RoomStatus from './RoomStatus';


const ControlRoomWidget = ({cols}) => (
  <Widget
    cols={cols}
    title="Control room"
  >
    <div
      style={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <RoomStatus />
    </div>
  </Widget>
);

export default ControlRoomWidget;

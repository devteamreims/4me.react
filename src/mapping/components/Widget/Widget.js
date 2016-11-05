import React from 'react';
import { connect } from 'react-redux';

import Widget from '../../../core/components/Dashboard/Widget';

import Paper from 'material-ui/Paper';

import ControlRoomLayout from '../ControlRoomLayout';
import CwpButton from './CwpButton';

const ControlRoomWidget = ({
  cols,
  sectorCount,
}) => {
  const RoomStatus = () => (
    <div style={{margin: '0 24px'}} />
  );

  return (
    <Widget
      cols={cols}
      title="Control room"
    >
      <div style={{display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
        <ControlRoomLayout
          cwpButtonComponent={<CwpButton style={{margin: 3}} />}
          roomStatusComponent={<RoomStatus />}
        />
      </div>
    </Widget>
  );
};

import {
  getOpenedCwpCount,
} from '../../selectors/map';

const mapStateToProps = state => ({
  sectorCount: getOpenedCwpCount(state),
});

export default connect(mapStateToProps)(ControlRoomWidget);

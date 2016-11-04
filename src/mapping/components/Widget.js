import React from 'react';
import { connect } from 'react-redux';

import Widget from '../../core/components/Dashboard/Widget';
import Paper from 'material-ui/Paper';


const ControlRoomWidget = ({
  cols,
  sectorCount,
}) => (
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
      <Paper style={{paddingLeft: 20, paddingRight: 20, textAlign: 'center'}}>
        <h1>{sectorCount}</h1>
        Sectors
      </Paper>
    </div>
  </Widget>
);

import {
  getOpenedCwpCount,
} from '../selectors/map';

const mapStateToProps = state => ({
  sectorCount: getOpenedCwpCount(state),
});

export default connect(mapStateToProps)(ControlRoomWidget);

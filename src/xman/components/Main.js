import React, { Component } from 'react';
import { connect } from 'react-redux';

import R from 'ramda';

import Divider from 'material-ui/Divider';

import FlightList from './FlightList';
import FlightListControls from './FlightListControls';
import StatusMessage from './StatusMessage';


class XmanRoot extends Component {
  render() {
    const {
      shouldDisplayMessage,
      shouldDisplayList,
      client,
      sectors,
    } = this.props;

    // Show filter controls only when we have sectors
    const showFilterControl = !R.isEmpty(sectors);
    // Show advanced controls only when we're a supervisor or a developer
    const showSupervisorControl = R.pipe(
      R.propOr(null, 'type'),
      R.equals('supervisor'),
    )(client) || process.env.NODE_ENV === 'development';

    const showFlightListControl = showFilterControl || showSupervisorControl;

    return (
      <div>
        {showFlightListControl && [
          <FlightListControls
            key="flight-list-controls-0"
            showFilterControl={showFilterControl}
            showSupervisorControl={showSupervisorControl}
          />,
          <Divider key="flight-list-controls-1" />,
        ]}
        {shouldDisplayMessage && [
          <StatusMessage
            key="status-message-0"
            style={{textAlign: 'center', margin: 0, padding: 10}}
          />,
          <Divider
            key="status-message-1"
          />,
        ]
        }
        {shouldDisplayList && <FlightList />}
      </div>
    );
  }
}

import {
  shouldDisplayMessage,
  shouldDisplayList,
} from '../selectors/status';

const mapStateToProps = (state) => ({
  shouldDisplayMessage: shouldDisplayMessage(state),
  shouldDisplayList: shouldDisplayList(state),
});

export default connect(mapStateToProps)(XmanRoot);

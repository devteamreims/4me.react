// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import R from 'ramda';

import Divider from 'material-ui/Divider';

import FlightList from './FlightList';
import FlightListControls from './FlightListControls';
import StatusMessage from './StatusMessage';

import RedirectToDashboard from '../../../shared/components/RedirectToDashboard';

import type { Sectors, Client } from '../../../core/types';

type Props = {
  shouldDisplayMessage: boolean,
  shouldDisplayList: boolean,
  hasPendingAction: boolean,
  client: Client,
  sectors: Sectors,
};

class XmanRoot extends Component {
  props: Props;

  render() {
    const {
      shouldDisplayMessage,
      shouldDisplayList,
      hasPendingAction,
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

    // We have sectors bound, we must redirect to dashboard after a while
    // But only if we don't have notifications
    const shouldRedirectToDashboard = !R.isEmpty(sectors) && !hasPendingAction;

    const showFlightListControl = showFilterControl || showSupervisorControl;

    return (
      <div>
        {shouldRedirectToDashboard && <RedirectToDashboard />}
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

import {
  getNotifications,
} from '../selectors/notifications';

const mapStateToProps = (state) => ({
  shouldDisplayMessage: shouldDisplayMessage(state),
  shouldDisplayList: shouldDisplayList(state),
  hasPendingAction: R.propOr(0, 'count', getNotifications(state)),
});

export default connect(mapStateToProps)(XmanRoot);

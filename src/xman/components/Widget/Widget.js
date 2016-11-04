import React from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import Widget from '../../../core/components/Dashboard/Widget';
import Controls from '../FlightListControls';
import StatusMessage from '../StatusMessage';
import CompactFlightList from './CompactFlightList';

const WidgetComponent = ({
  cols,
  sectors,
  shouldDisplayList,
  shouldDisplayMessage,
}) => {
  if(!shouldDisplayList) {
    return (
      <Widget
        cols={cols}
        title="XMAN : Error !"
      />
    );
  }

  // If we have no sectors bound, do not display filter controls
  const showFilterControl = !R.isEmpty(sectors);
  const title = showFilterControl ?
    <Controls showFilterControl={showFilterControl} /> :
    null;

  return (
    <Widget
      cols={cols}
      title={title}
    >
      {shouldDisplayMessage &&
        <StatusMessage
          key="status-message-0"
          style={{textAlign: 'center', margin: 0, padding: 10}}
        />
      }
      <CompactFlightList />
    </Widget>
  );
};

import {
  shouldDisplayList,
  shouldDisplayMessage,
} from '../../selectors/status';

const mapStateToProps = state => ({
  shouldDisplayList: shouldDisplayList(state),
  shouldDisplayMessage: shouldDisplayMessage(state),
});

export default connect(mapStateToProps)(WidgetComponent);

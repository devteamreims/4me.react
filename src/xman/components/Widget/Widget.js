import React from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import Widget from '../../../core/components/Dashboard/Widget';
import Controls from '../FlightListControls';
import CompactFlightList from './CompactFlightList';

const WidgetComponent = ({
  cols,
  sectors,
  shouldDisplayList,
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
      <CompactFlightList />
    </Widget>
  );
};

import {
  shouldDisplayList,
} from '../../selectors/status';

const mapStateToProps = state => ({
  shouldDisplayList: shouldDisplayList(state),
});

export default connect(mapStateToProps)(WidgetComponent);

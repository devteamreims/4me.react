import React from 'react';

import R from 'ramda';

import Widget from '../../../core/components/Dashboard/Widget';
import Controls from '../FlightListControls';
import CompactFlightList from './CompactFlightList';

const WidgetComponent = ({
  cols,
  sectors,
}) => {
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

export default WidgetComponent;

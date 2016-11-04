import React from 'react';

import R from 'ramda';
import { muiThemeable } from 'material-ui/styles';

import SearchBox from '../SearchBox';

const WidgetSearchBar = ({
  muiTheme,
  onClickOnFlight
}) => {
  const backgroundColor = R.pathOr('red', ['appBar', 'color'], muiTheme);
  const style = {
    padding: '0 10px',
    backgroundColor,
  };

  return (
    <div style={style}>
      <SearchBox onNewRequest={onClickOnFlight} />
    </div>
  );
};

export default muiThemeable()(WidgetSearchBar);

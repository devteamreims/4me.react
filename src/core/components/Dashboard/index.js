import React, {Component} from 'react';

import R from 'ramda';

import {GridList, GridTile} from 'material-ui/GridList';
import { Link } from 'react-router';

const styles = {
  gridList: {
    margin: 0,
    border: '1px solid red',
    alignContent: 'flex-start',
  },
  gridTile: {
    border: '1px solid blue',
    flexGrow: 1,
  },
  gridTileChildren: {
    border: '1px solid green',
    maxHeight: '100%',
    overflowY: 'auto',
  },
};

class Dashboard extends Component {
  _prepareWidgets() {
    const {
      widgets,
    } = this.props;

    const widgetToGridTile = ({
      component: Component,
      widgetColumns = 1,
      pathName,
    }) => (
      <Component
        pathName={pathName}
        cols={widgetColumns}
      />
    );

    return R.map(widgetToGridTile, widgets);
  }

  render() {
    const widgets = this._prepareWidgets();

    return (
      <GridList
        style={styles.gridList}
        cols={3}
        cellHeight={300}
      >
        {widgets}
      </GridList>
    );
  }
}

export default Dashboard;

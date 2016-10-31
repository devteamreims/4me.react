import React, {Component} from 'react';

import R from 'ramda';

import {GridList} from 'material-ui/GridList';

const styles = {
  gridList: {
    margin: 0,
    alignContent: 'flex-start',
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

import React from 'react';

import { GridTile } from 'material-ui/GridList';
import { Link } from 'react-router';

const styles = {
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

const Widget = ({
  cols = 1,
  children,
  title,
}) => (
  <GridTile
    style={styles.gridTile}
    cols={cols}
    title={title}
  >
    <div style={styles.gridTileChildren}>
      {children}
    </div>
  </GridTile>
);


export default Widget;

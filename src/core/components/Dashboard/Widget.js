import React from 'react';

import { GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

const styles = {
  gridTile: {
    margin: 10,
  },
  gridTileChildren: {
    maxHeight: '100%',
    overflowY: 'auto',
    padding: 10,
  },
};

const Widget = ({
  cols = 1,
  children,
  title,
}) => {
  // If we have a title, we must add some padding in our div to allow scroll all the way down
  const innerStyle = Object.assign({}, styles.gridTileChildren);

  if(title) {
    Object.assign(innerStyle, {paddingBottom: 48});
  }

  return (
    <GridTile
      style={styles.gridTile}
      cols={cols}
      title={title}
      containerElement={Paper}
    >
      <div style={innerStyle}>
        {children}
      </div>
    </GridTile>
  );
};


export default Widget;

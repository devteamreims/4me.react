import React, { Component } from 'react';


import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';

import SearchBox from './SearchBox';
import History from './History';

import theme from '../../theme';

const style = {
  outer: {
    //border: '1px solid red',
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100%',
    position: 'relative',
    width: '100%',
  },
  leftPanel: {
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '282px',
    //paddingLeft: 10,
    zIndex: 100,
  },
  rightPanel: {
    flexGrow: '1',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '200px',
  },
  searchBoxContainer: {
    padding: 10,
    paddingRight: 0,
    backgroundColor: theme.palette.primary1Color,
  },
}

class ArcidRoot extends Component {
  render() {
    return (
      <div style={style.outer}>
        <Paper
          zDepth={3}
          style={style.leftPanel}
        >
          <div style={style.searchBoxContainer}>
            <SearchBox />
          </div>
          <Divider />
          <History />
        </Paper>
        <Paper
          zDepth={1}
          style={style.rightPanel}
        >
          Right Panel
        </Paper>
      </div>
    );
  }
}

export default ArcidRoot;

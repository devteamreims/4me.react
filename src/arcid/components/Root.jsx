import React, { Component } from 'react';


import Paper from 'material-ui/lib/paper';

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
    width: '200px',
    paddingLeft: 10,
    zIndex: 100,
  },
  rightPanel: {
    flexGrow: '1',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '200px',
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
          Left Panel
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

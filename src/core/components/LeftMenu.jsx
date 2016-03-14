import React, { Component } from 'react';

import Paper from 'material-ui/lib/paper';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class LeftMenu extends Component {
  render() {
    return (
      <Paper
        zDepth={3}
        className="testtest"
      >
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Paper>
    );
  }
}

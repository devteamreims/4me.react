import React, { Component } from 'react';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';

export default class TopBar extends Component {
  render() {
    return (
      <AppBar
        title="4ME"
        iconElementRight={<span>TEST ?</span>}
        iconElementLeft={<div></div>}
      />
    );
  }
}

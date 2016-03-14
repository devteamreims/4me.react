import React, { Component } from 'react';

import TopBar from './TopBar';
import LeftMenu from './LeftMenu';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import DarkTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';

export default class App extends Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(DarkTheme),
    };
  }


  render() {
    return (
      <div>
        <TopBar id="topbar" />
        <div id="main-wrap">
            <div id="leftnav">
              <LeftMenu />
            </div>
            <div id="content">
              {this.props.children}
            </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';

import TopBar from './TopBar';
import LeftMenu from './LeftMenu';

export default class App extends Component {
  render() {
    return (
      <div>
        <TopBar id="topbar" />
        <div id="main-wrap">
            <div id="leftnav">
              <LeftMenu className="box" />
            </div>
            <div id="content">
              {this.props.children}
            </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';

import { connect } from 'react-redux';

import { startBootstrap } from '../actions/bootstrap';

import {
  isBootstrapping,
  getBootstrappingString,
  isErrored,
  getErrorString,
} from '../selectors/bootstrap';

import LoadingScreen from './LoadingScreen';

import TopBar from './TopBar';
import LeftMenu from './LeftMenu';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import mainTheme from '../../theme';

export class App extends Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  getChildContext() {
    return {
      muiTheme: getMuiTheme(mainTheme),
    };
  }

  componentWillMount() {
    this.props.startBootstrap();
  }

  render() {
    if(this.props.isErrored) {
      return (
        <LoadingScreen message={this.props.errorMessage}>
          <span onClick={() => this.props.startBootstrap()}>Restart bootstrap ?</span>
        </LoadingScreen>
      );
    }

    if(this.props.isBootstrapping) {
      return (
        <LoadingScreen message={this.props.bootstrapMessage} />
      );
    }

    return (
      <div>
        <TopBar id="topbar" />
        <div id="main-wrap">
            <div id="leftnav">
              <LeftMenu location={this.props.location} />
            </div>
            <div id="content">
              {this.props.children}
            </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  startBootstrap,
};

const mapStateToProps = (state) => {
  return {
    isBootstrapping: isBootstrapping(state),
    isErrored: isErrored(state),
    bootstrapMessage: getBootstrappingString(state),
    errorMessage: getErrorString(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

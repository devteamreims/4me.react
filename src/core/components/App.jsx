import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import _ from 'lodash';

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
import Keyboard from './Keyboard';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import mainTheme from '../../theme';

export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      keyboardOpen: false,
      keyboardTarget: null,
    };
  }

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

  _shouldTriggerKeyboard(target) {
    return _.get(target, 'nodeName') === 'INPUT'
      && _.get(target, 'type') === 'text';
  }

  focusHandler = (el) => {
    if(this._shouldTriggerKeyboard(el.target)) {
      this.setState({keyboardOpen: true, keyboardTarget: el.target});
    }
  };

  blurHandler = (el) => {
    if(this._shouldTriggerKeyboard(el.target)) {
      this.setState({keyboardOpen: false, keyboardTarget: null});
    }
  }

  componentDidMount() {
    window.addEventListener('focus', this.focusHandler, true);
    window.addEventListener('blur', this.blurHandler, true);
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.focusHandler, true);
    window.removeEventListener('blur', this.blurHandler, true);
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

    const {
      keyboardOpen,
      keyboardTarget,
    } = this.state;

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
        <Keyboard
          hide={!keyboardOpen}
          target={keyboardTarget}
        />
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

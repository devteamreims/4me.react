import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import FlatButton from 'material-ui/FlatButton';

import LoadingScreen from './LoadingScreen';
import TopBar from './TopBar';
import LeftMenu from './LeftMenu';
import Keyboard from './Keyboard';
import ReturnToDashboard from './ReturnToDashboard';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import mainTheme from '../../theme';

import '../../styles/disable-select.scss';

export class App extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      keyboardOpen: false,
      keyboardTarget: null,
    };
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(mainTheme),
    };
  }

  componentWillMount() {
    this.props.startBootstrap();
  }

  componentDidMount() {
    window.addEventListener('focus', this.focusHandler, true);
    window.addEventListener('blur', this.blurHandler, true);
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.focusHandler, true);
    window.removeEventListener('blur', this.blurHandler, true);
  }

  _shouldTriggerKeyboard(target) {
    return _.get(target, 'nodeName') === 'INPUT' && _.get(target, 'type') === 'text';
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
  };

  handleRestart = (ev) => { // eslint-disable-line no-unused-vars
    const {
      startBootstrap,
    } = this.props;

    startBootstrap();
  };

  handleUserInteraction = _.debounce((ev) => { // eslint-disable-line no-unused-vars
    const {
      interact,
    } = this.props;

    interact();
  }, 100);

  render() {
    const {
      isErrored,
      errorMessage,
      isBootstrapping,
      bootstrapMessage,
      location,
      children,
      shouldZoomUi,
      uiZoom,
      shouldDisableSelect,
    } = this.props;


    const styles = {};

    // Here we apply zoom to body
    // Some material-ui components will not remain self contained in our DOM tree
    // Some will append elements to document.body, hence the need for a full body zoom level
    if(shouldZoomUi) {
      document.body.style.zoom = uiZoom;
    }

    let className;

    if(shouldDisableSelect) {
      className = 'disable-select';
    }

    if(isErrored) {
      return (
        <LoadingScreen
          actions={<FlatButton label="Reload" onTouchTap={this.handleRestart} />}
          style={styles}
          className={className}
        >
          {errorMessage}
        </LoadingScreen>
      );
    }

    if(isBootstrapping) {
      return (
        <LoadingScreen
          className={className}
          style={styles}
        >
          {bootstrapMessage}
        </LoadingScreen>
      );
    }

    const {
      keyboardOpen,
      keyboardTarget,
    } = this.state;

    return (
      <div
        className={className}
        style={styles}
        onClick={this.handleUserInteraction}
        onMouseDown={this.handleUserInteraction}
        onKeyDown={this.handleUserInteraction}
        onWheel={this.handleUserInteraction}
      >
        <TopBar id="topbar" />
        <ReturnToDashboard />
        <div id="main-wrap">
          <div id="leftnav">
            <LeftMenu location={location} />
          </div>
          <div id="content">
            {children}
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

import { startBootstrap } from '../actions/bootstrap';

import {
  interact,
} from '../actions/returnToDashboard';

import {
  isBootstrapping,
  getBootstrappingString,
  isErrored,
  getErrorString,
} from '../selectors/bootstrap';

import {
  isNormalCwp,
} from '../selectors/cwp';

const mapDispatchToProps = {
  startBootstrap,
  interact,
};

const mapStateToProps = (state) => {
  return {
    isBootstrapping: isBootstrapping(state),
    isErrored: isErrored(state),
    bootstrapMessage: getBootstrappingString(state),
    errorMessage: getErrorString(state),
    shouldZoomUi: isNormalCwp(state),
    /* global __DEMO__ */
    shouldDisableSelect: !(process.env.NODE_ENV === 'development' || __DEMO__ === true),
    uiZoom: 1.20,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

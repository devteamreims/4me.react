import React, { Component } from 'react';
import { connect } from 'react-redux';

import R from 'ramda';

import FlatButton from 'material-ui/FlatButton';

import LoadingScreen from './LoadingScreen';
import TopBar from './TopBar';
import LeftMenu from './LeftMenu';
import Keyboard from './Keyboard';
import ReturnToDashboard from './ReturnToDashboard';
import InteractionCatcher from './InteractionCatcher';

import { HashRouter as Router, Match, Miss } from 'react-router';

import { injectOrganProps } from '../wrappers/injectOrganProps';
import { isModuleDisabled } from '../../fmeModules';

import * as ExampleModule from '../../example-module';
import * as MappingModule from '../../mapping';
import * as XmanModule from '../../xman';
import * as EtfmsProfileModule from '../../arcid';

const injectMatch = (pathName) => DecoratedComponent => {
  const wrappedComponent = () => (
    <Match
      pattern={pathName}
      key={pathName}
      component={DecoratedComponent}
    />
  );
  wrappedComponent.displayName = `match(${pathName})`;

  return wrappedComponent;
};

const getMainComponent = ({uri, Main, name}) => {
  if(!Main || isModuleDisabled(name)) {
    return () => null;
  }

  return R.compose(
    injectMatch(uri),
    injectOrganProps,
  )(Main);
};

import Dashboard from './Dashboard';
import StatusPage from './Status';
import Error404 from './Error404';

import '../../styles/disable-select.scss';

export class App extends Component {
  componentDidMount() {
    this.handleRestart();
  }

  componentWillUnmount() {
    const {
      cleanUp,
    } = this.props;

    cleanUp();
  }

  handleRestart = (ev) => { // eslint-disable-line no-unused-vars
    const {
      startBootstrap,
      cleanUp,
    } = this.props;

    cleanUp().then(() => startBootstrap());
  };

  render() {
    const {
      isErrored,
      errorMessage,
      isBootstrapping,
      bootstrapMessage,
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

    // If our app is errored or boostrapping, show some place holder
    if(isErrored || isBootstrapping) {
      const actions = isErrored ? (
        <FlatButton label="Reload" onTouchTap={this.handleRestart} />
      ) : null;

      const title = isErrored ? 'Error' : 'Loading ...';

      return (
        <LoadingScreen
          actions={actions}
          title={title}
          style={styles}
          className={className}
        >
          {errorMessage || bootstrapMessage}
        </LoadingScreen>
      );
    }


    // We we decorate organs main modules with our wrapper
    const MatchExampleModule = getMainComponent(ExampleModule);
    const MatchMapping = getMainComponent(MappingModule);
    const MatchXman = getMainComponent(XmanModule);
    const MatchEtfmsProfile = getMainComponent(EtfmsProfileModule);

    return (
      <Router>
        <InteractionCatcher
          className={className}
          style={styles}
        >
          <TopBar
            id="topbar"
          />
          <ReturnToDashboard />
          <div id="main-wrap">
            <div id="leftnav">
              <LeftMenu />
            </div>
            <Match
              pattern="/"
              render={() => (
                <div id="content">
                  <Match
                    key="dashboard"
                    pattern="/"
                    exactly={true}
                    render={
                      () => (
                        <Dashboard
                          widgets={[]}
                        />
                      )
                    }
                  />
                  <Match
                    key="status"
                    pattern="/status"
                    component={StatusPage}
                  />
                  <MatchExampleModule />
                  <MatchMapping />
                  <MatchXman />
                  <MatchEtfmsProfile />
                  <Miss key="error404" component={Error404} />
                </div>
              )}
            />
          </div>
          <Keyboard />
        </InteractionCatcher>
      </Router>
    );
  }
}

import {
  startBootstrap,
  cleanUp,
} from '../actions/bootstrap';

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
  cleanUp,
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

import withMuiTheme from '../wrappers/withMuiTheme';

export default R.compose(
  withMuiTheme,
  connect(mapStateToProps, mapDispatchToProps),
)(App);

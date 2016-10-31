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

  _prepareOrganStatusGetters = () => {
    const { organs } = this.props;
    const organToStatusGetter = R.prop('getStatus');

    return R.pipe(
      R.map(organToStatusGetter),
      R.values,
      R.reject(R.isNil),
    )(organs);
  }

  _prepareMenuItems = () => {
    const { organs } = this.props;

    const organToMenuItem = (organ, name) => {
      const { pathName } = organ;
      const rawComponent = R.prop('MenuButtonComponent', organ);
      if(!rawComponent) {
        return;
      }

      const component = injectOrganProps(name)(rawComponent);

      return {
        pathName,
        component,
      };
    };

    return R.pipe(
      R.mapObjIndexed(organToMenuItem),
      R.values,
      R.reject(R.isNil),
    )(organs);
  };

  _prepareMainItems = () => {
    const { organs } = this.props;

    const organToMainItem = (organ, name) => {
      const { pathName } = organ;

      const rawComponent = R.prop('MainComponent', organ);
      if(!rawComponent) {
        return;
      }
      const component = injectOrganProps(name)(rawComponent);

      return (
        <Match key={pathName} pattern={pathName} component={component} />
      );
    };

    return R.pipe(
      R.mapObjIndexed(organToMainItem),
      R.values,
      R.reject(R.isNil)
    )(organs);
  };

  _prepareWidgets = () => {
    const { organs } = this.props;

    const organToWidget = (organ, name) => {
      const {
        pathName,
        widgetColumns = 1,
      } = organ;
      const rawComponent = R.prop('WidgetComponent', organ);
      if(!rawComponent) {
        return;
      }

      const component = injectOrganProps(name)(rawComponent);

      return {
        pathName,
        widgetColumns,
        component,
      };
    };

    return R.pipe(
      R.mapObjIndexed(organToWidget),
      R.values,
      R.reject(R.isNil),
    )(organs);
  };

  _prepareStatusItem = () => {
    const { organs } = this.props;

    const organToStatusItem = (organ, name) => {
      const rawComponent = R.prop('StatusComponent', organ);
      if(!rawComponent) {
        return;
      }

      const component = injectOrganProps(name)(rawComponent);

      return component;
    };

    return R.pipe(
      R.mapObjIndexed(organToStatusItem),
      R.values,
      R.reject(R.isNil),
    )(organs);
  };

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

    // At this point, the app is ready, render our layout

    // Prepare organ data here
    const organStatusGetters = this._prepareOrganStatusGetters();
    const leftMenuRows = this._prepareMenuItems();
    const mainRouterItems = this._prepareMainItems();
    const organStatusComponents = this._prepareStatusItem();
    const organWidgets = this._prepareWidgets();

    console.log('CACABOUDIN');
    console.log('organs', this.props.organs);
    console.log('mainRouter', mainRouterItems);
    console.log('statusItems', organStatusComponents);
    console.log('leftMenu', leftMenuRows);
    console.log('widgets', organWidgets);

    return (
      <Router>
        <InteractionCatcher
          className={className}
          style={styles}
        >
          <TopBar
            id="topbar"
            statusGetters={organStatusGetters}
          />
          <ReturnToDashboard />
          <div id="main-wrap">
            <div id="leftnav">
              <LeftMenu rows={leftMenuRows} />
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
                          widgets={organWidgets}
                        />
                      )
                    }
                  />
                  <Match
                    key="status"
                    pattern="/status"
                    render={
                      () => (
                        <StatusPage organComponents={organStatusComponents} />
                      )
                    }
                  />
                  {mainRouterItems}
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

// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import FlatButton from 'material-ui/FlatButton';

import LoadingScreen from './LoadingScreen';
import TopBar from './TopBar';
import LeftMenu from './LeftMenu';
import Keyboard from './Keyboard';
import ReturnToDashboard from './ReturnToDashboard';
import InteractionCatcher from './InteractionCatcher';

import { HashRouter as Router, Match, Miss } from 'react-router';

import { injectOrganProps } from '../wrappers/injectOrganProps';
import { isModuleDisabled } from '../../shared/utils/modules';

import * as ExampleModule from '../../modules/example-module';
import * as MappingModule from '../../modules/mapping';
import * as XmanModule from '../../modules/xman';
import * as EtfmsProfileModule from '../../modules/etfms-profile';
import * as AtfcmModule from '../../modules/atfcm';

import Dashboard from './Dashboard';
import StatusPage from './Status';
import Error404 from './Error404';


const styles = {
  disableSelect: {
    userSelect: 'none',
  },
  zoom: {
    zoom: '1.2',
  },
};

import type { EmptyComponent } from '../../shared/types';

type MainComponent = Class<React.Component<*, *, *>> | EmptyComponent;
const getMainComponent = ({Main, name}): MainComponent => {
  if(!Main || isModuleDisabled(name)) {
    return () => null;
  }
  return injectOrganProps(Main);
};

type Props = {
  // Redux actions
  cleanUp: Function,
  startBootstrap: Function,
  // Redux state props
  isErrored: boolean,
  isBootstrapping: boolean,
  errorMessage: ?string,
  bootstrapMessage: ?string,
  shouldZoomUi: boolean,
  uiZoom: number,
  shouldDisableSelect: boolean,
  sheet: {
    classes: Object,
  },
};

export class App extends Component {
  props: Props;
  _organs: {
    [key: string]: MainComponent,
  };

  constructor(props: Props) {
    super(props);
    /**
     * Here, we preload our components in constructor
     * We do this here, because otherwise, for some reason, hot module reloading breaks
     */
    this._organs = {
      XmanModuleComponent: getMainComponent(XmanModule),
      ExampleModuleComponent: getMainComponent(ExampleModule),
      MappingModuleComponent: getMainComponent(MappingModule),
      EtfmsProfileModuleComponent: getMainComponent(EtfmsProfileModule),
      AtfcmModuleComponent: getMainComponent(AtfcmModule),
    };
  }

  componentDidMount() {
    this.handleRestart();
  }

  componentWillUnmount() {
    const {
      cleanUp,
    } = this.props;

    cleanUp();
  }

  handleRestart = () => { // eslint-disable-line no-unused-vars
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
      shouldDisableSelect,
      sheet: {classes},
    } = this.props;


    const styles = {};

    // Here we apply zoom to body
    // Some material-ui components will not remain self contained in our DOM tree
    // Some will append elements to document.body, hence the need for a full body zoom level
    if(document.body && document.body.classList) {
      document.body.classList.toggle(classes.zoom, shouldZoomUi);
    }

    let className;

    if(shouldDisableSelect) {
      className = classes.disableSelect;
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

    const {
      XmanModuleComponent,
      ExampleModuleComponent,
      MappingModuleComponent,
      EtfmsProfileModuleComponent,
      AtfcmModuleComponent,
    } = this._organs;


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
                    component={Dashboard}
                  />
                  <Match
                    key="status"
                    pattern="/status"
                    component={StatusPage}
                  />
                  <Match
                    key="xman"
                    pattern={XmanModule.uri}
                    component={XmanModuleComponent}
                  />
                  <Match
                    key="example"
                    pattern={ExampleModule.uri}
                    component={ExampleModuleComponent}
                  />
                  <Match
                    key="etfmsProfile"
                    pattern={EtfmsProfileModule.uri}
                    component={EtfmsProfileModuleComponent}
                  />
                  <Match
                    key="mapping"
                    pattern={MappingModule.uri}
                    component={MappingModuleComponent}
                  />
                  <Match
                    key="atfcm"
                    pattern={AtfcmModule.uri}
                    component={AtfcmModuleComponent}
                  />
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
} from '../selectors/client';

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
    shouldDisableSelect: process.env.NODE_ENV === 'development',
  };
};

const styledComponent = injectSheet(styles)(App);
export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);

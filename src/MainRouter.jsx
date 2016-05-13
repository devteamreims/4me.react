import React, { Component } from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import { connect } from 'react-redux';


import App from './core/components/App';
import NotFoundView from './core/views/NotFoundView';
import Status from './core/components/Status';

import _ from 'lodash';

import organs from './organs';

const organRoutes = _.map(organs, (organ) =>
  (
    organ.routes || <Route key={organ.name} path={organ.name} component={organ.rootComponent} />
  )
);


class MainRouter extends Component {
  render() {
    const {
      indexRoute,
      ...other,
    } = this.props;
    return (
      <Router
        history={hashHistory}
        {...other}
      >
        <Redirect from="/" to={indexRoute} />
        <Route path="/" component={App}>
          {/* <IndexRoute component={Dashboard} /> */}
          {organRoutes}
          <Route path="/status" component={Status} />
          <Route path="404" component={NotFoundView} />
          <Redirect from="*" to="404" />
        </Route>
      </Router>
    );
  }
}

import {
  getIndexRoute,
} from './core/selectors/routes';

const mapStateToProps = (state) => {
  return {
    indexRoute: getIndexRoute(state),
  };
};

export default connect(mapStateToProps)(MainRouter);

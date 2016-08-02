import React from 'react';

import { Route } from 'react-router';

import rootComponent from './components/Root';
import rootReducer from './reducers';

import { bootstrap } from './actions/bootstrap';

import { getStatus } from './selectors/status';

import { shouldRedirectToDashboard } from './selectors/returnToDashboard';
import withRedirectToDashboard from '../core/wrappers/withRedirectToDashboard';
import { getIndexRoute } from '../core/selectors/routes';
const getTargetRoute = getIndexRoute;

const enhancedComponent = withRedirectToDashboard(
  shouldRedirectToDashboard,
  getTargetRoute
)(rootComponent);

export default {
  name: 'mapping',
  displayName: 'control room',
  linkTo: 'mapping',
  bootstrap,
  rootComponent: enhancedComponent,
  routes: <Route key="mapping" path="/mapping" component={enhancedComponent} />,
  rootReducer,
  getStatus,
};

import React from 'react';

import { Route } from 'react-router';

import rootComponent from './components/Root';
import rootReducer from './reducers';

import {
  bootstrap,
  onSectorChange,
} from './actions/bootstrap';

import { getNotifications } from './selectors/notifications';

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
  name: 'xman',
  bootstrap,
  rootComponent: enhancedComponent,
  routes: <Route key="xman" path="/xman" component={rootComponent} />,
  rootReducer,
  onSectorChange,
  getNotifications,
  getStatus,
};

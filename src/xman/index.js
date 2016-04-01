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

export default {
  name: 'xman',
  bootstrap,
  rootComponent,
  routes: <Route key="xman" path='/xman' component={rootComponent} />,
  rootReducer,
  onSectorChange,
  getNotifications,
  getStatus,
};

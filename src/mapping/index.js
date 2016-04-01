import React from 'react';

import { Route } from 'react-router';

import rootComponent from './components/Root';
import rootReducer from './reducers';

import { bootstrap } from './actions/bootstrap';

import { getNotifications } from './selectors/notifications';

export default {
  name: 'mapping',
  bootstrap,
  rootComponent,
  routes: <Route key="mapping" path='/mapping' component={rootComponent} />,
  rootReducer,
  getNotifications,
};

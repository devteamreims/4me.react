import React from 'react';

import { Route } from 'react-router';

import rootComponent from './components/Root';
import rootReducer from './reducers';

import { bootstrap } from './actions/bootstrap';

import { getStatus } from './selectors/status';

export default {
  name: 'mapping',
  displayName: 'control room',
  linkTo: 'mapping',
  bootstrap,
  rootComponent,
  routes: <Route key="mapping" path="/mapping" component={rootComponent} />,
  rootReducer,
  getStatus,
};

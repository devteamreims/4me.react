import React from 'react';

import { Route } from 'react-router';

import rootComponent from './Xman';
import rootReducer from './reducers';

import { bootstrap } from './actions/bootstrap';

export default {
  name: 'xman',
  bootstrap,
  rootComponent,
  routes: <Route key="xman" path='/xman' component={rootComponent} />,
  rootReducer,
  onSectorChange: () => (dispatch, getState) => {console.log('Dispatching xman on sector change')},
  getNotifications: () => ({count: 0}),
};

import _ from 'lodash';
import React from 'react';

import Xman from './xman/Xman';
import Arcid from './arcid/Arcid';
import mapping from './mapping';

import { Route } from 'react-router';

const stubNotifications = {
  count: 2,
  priority: 'critical',
};

const getNotifications = () => {
  return stubNotifications;
}

const organs = [{
  name: 'xman',
  bootstrap: () => (dispatch, getState) => {console.log('Bootstrapping XMAN');},
  rootComponent: Xman,
  routes: <Route key="xman" path='/xman' component={Xman} />,
  rootReducer: (state = {}, action) => state,
  getNotifications,
}, {
  name: 'arcid',
  bootstrap: () => (dispatch, getState) => {console.log('Bootstrapping ARCID');},
  rootComponent: Arcid,
  getNotifications,
},
  mapping,
];

export function getReducers() {
  return _.reduce(organs, (prev, organ) => {
    if(!organ.rootReducer) {
      return prev;
    }
    return _.merge(prev, {[organ.name]: organ.rootReducer});
  }, {});
}


export default organs;

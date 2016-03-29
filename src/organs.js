import _ from 'lodash';
import React from 'react';

import xman from './xman';
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

const defaults = {
  bootstrap: () => () => {},
  getNotifications,
  onSectorChange: () => () => {},
};

const organs = _.map([
  xman,
  {
    name: 'arcid',
    bootstrap: () => (dispatch, getState) => {console.log('Bootstrapping ARCID');},
    rootComponent: Arcid,
  },
  mapping,
], organ => _.defaults(organ, defaults));

export function getReducers() {
  return _.reduce(organs, (prev, organ) => {
    if(!organ.rootReducer) {
      return prev;
    }
    return _.merge(prev, {[organ.name]: organ.rootReducer});
  }, {});
}


export default organs;

import _ from 'lodash';
import React from 'react';

import xman from './xman';
import arcid from './arcid';
import mapping from './mapping';

import { Route } from 'react-router';

const stubNotifications = {};

const getNotifications = () => {
  return stubNotifications;
}

const stubStatus = {
  status: 'normal',
  items: [],
};

const getStatus = () => {
  return stubStatus;
};

const defaults = {
  bootstrap: () => () => {},
  getNotifications,
  onSectorChange: () => () => {},
  getStatus,
};

const organs = _.map([
  xman,
  arcid,
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

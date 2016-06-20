import p from './prefix';
import _ from 'lodash';

export const getRaw = (state) => _.get(p(state), 'returnToDashboard', {});

export const isEnabled = (state) => !!_.get(getRaw(state), 'enabled');

export const getLastInteraction = (state) => _.get(getRaw(state), 'lastUserInteraction');

const getInterval = (state) => _.get(getRaw(state), 'interval');

export const getReturnToDashboardTime = (state) => {
  if(isEnabled(state)) {
    return new Date(getLastInteraction(state) + getInterval(state));
  }

  return null;
};

export const getTargetRoute = (state) => _.get(getRaw(state), 'targetRoute', '/');

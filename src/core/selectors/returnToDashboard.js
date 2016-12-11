// @flow
import p from './prefix';
import _ from 'lodash';

import type { Selector } from '../../store';
import type { State } from '../reducers/returnToDashboard';

export const getRaw: Selector<State> = state => _.get(p(state), 'returnToDashboard', {});

export const isEnabled: Selector<boolean> = state => !!_.get(getRaw(state), 'enabled');

export const getLastInteraction: Selector<number> = state => getRaw(state).lastUserInteraction;

const getInterval: Selector<number> = (state) => _.get(getRaw(state), 'interval');

export const getReturnToDashboardTime: Selector<?Date> = (state) => {
  if(isEnabled(state)) {
    return new Date(getLastInteraction(state) + getInterval(state));
  }

  return null;
};

export const getTargetRoute: Selector<string> = (state) => _.get(getRaw(state), 'targetRoute', '/');

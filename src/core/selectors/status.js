// @flow
import _ from 'lodash';
import R from 'ramda';

import {
  isConnected,
} from './socket';

import type { Selector } from '../../store';
import type {
  StatusItem,
  StatusLevel,
  StatusDisplayLevel,
} from '../types';

export const isNormal: Selector<boolean> = (state) => isConnected(state);
export const isWarning: Selector<boolean> = () => false;
export const isErrored: Selector<boolean> = (state) => !isConnected(state);

export const getStatusString: Selector<string> = (state) => {
  if(isErrored(state)) {
    return 'error';
  } else if(isWarning(state)) {
    return 'warning';
  }

  return 'normal';
};

export const getSocketStatus: Selector<StatusItem> = (state) => {
  let status;
  if(isConnected(state)) {
    status = 'normal';
  } else {
    status = 'error';
  }
  return {
    name: 'Mapping socket',
    description: 'Realtime connection to mapping backend',
    status,
  };
};


export const getCoreStatus: Selector<StatusItem> = (state) => {
  const items = [
    getSocketStatus(state),
  ];

  const status = maxStatus(_.map(items, item => item.status));

  return {
    name: 'Core',
    status,
    items,
  };
};


const getOrganStatuses = R.pathOr({}, ['core', 'organStatus']);

export const getGlobalStatusString: Selector<StatusLevel> = (state) => {
  const organStatuses = R.pipe(
    getOrganStatuses,
    R.values,
  )(state);

  return maxStatus([
    getCoreStatus(state).status,
    ...organStatuses
  ]);
};

export function maxStatus(items: Array<StatusLevel>): StatusLevel {
  const reduceStatus = (prev: StatusLevel, current: StatusLevel): StatusLevel => {
    if(current === 'critical' || prev === 'critical' || current === 'error' || prev === 'error') {
      return 'critical';
    }

    if(current === 'warning' || prev === 'warning') {
      return 'warning';
    }

    return 'normal';
  };

  return _.reduce(items, reduceStatus);
}

import {
  isSupervisor,
  isTechSupervisor,
} from './client';

/*
 * Returns a string : dumb, normal, extended
 * Controls the amout of info displayed on the status page
 */

export const getDisplayLevel: Selector<StatusDisplayLevel> = state => {
  if(isTechSupervisor(state)) {
    return 'extended';
  }

  if(isSupervisor(state)) {
    return 'normal';
  }

  return 'dumb';
};

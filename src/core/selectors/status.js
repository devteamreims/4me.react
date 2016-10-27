import _ from 'lodash';

import {
  isConnected,
} from './socket';

export const isNormal = (state) => isConnected(state);
export const isWarning = () => false;
export const isErrored = (state) => !isConnected(state);

export const getStatusString = (state) => {
  if(isErrored(state)) {
    return 'error';
  } else if(isWarning(state)) {
    return 'warning';
  } else {
    return 'normal';
  }
};

export const getSocketStatus = (state) => {
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


export const getCoreStatus = (state) => {
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

import organs from '../../organs';

export const getGlobalStatusString = (state) => {
  return maxStatus([
    getCoreStatus(state).status,
    ..._.map(organs, organ => organ.getStatus(state).status || 'normal'),
  ]);
};

export function maxStatus(items) {
  const reduceStatus = (prev, current) => {
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
} from './cwp';

/*
 * Returns a string : dumb, normal, extended
 * Controls the amout of info displayed on the status page
 */

export const getDisplayLevel = state => {
  if(isTechSupervisor(state)) {
    return 'extended';
  }

  if(isSupervisor(state)) {
    return 'normal';
  }

  return 'dumb';
};

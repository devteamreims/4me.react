import _ from 'lodash';

import {
  getFlightByIfplId,
} from './flight-list';

import {
  isForcedOff,
} from './status';

export const getAdvisedSpeed = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'advisory.speed', null);
export const getAdvisedMach = (state, ifplId) => {
  const flight = getFlightByIfplId(state, ifplId);
  const fetcher = _.get(flight, 'destination');

  if(isForcedOff(state, fetcher)) {
    return null;
  }

  return _.get(getFlightByIfplId(state, ifplId), 'advisory.machReduction', null);
};

export const getAppliedSpeed = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'currentStatus.speed', null);
// eslint-disable-next-line max-len
export const getAppliedMach = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'currentStatus.machReduction', null);

// eslint-disable-next-line max-len
export const getMinimumCleanSpeed = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'currentStatus.minimumCleanSpeed', null);


export const getTotalDelay = (state, ifplId) => {
  return Math.floor(_.get(getFlightByIfplId(state, ifplId), 'delay', 0) / 60);
};


export const isFlightInSpeedMode = (state, ifplId) => {
  return getAdvisedSpeed(state, ifplId) !== null;
};

export const isFlightInMachMode = (state, ifplId) => !isFlightInSpeedMode(state, ifplId);

// eslint-disable-next-line max-len
export const isFlightInMcsMode = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'advisory.minimumCleanSpeed', false);

export function isActionComplete(advisedSpeed, appliedSpeed, minimumCleanSpeed) {
  if(!advisedSpeed || advisedSpeed === 0) {
    return true;
  }

  if(minimumCleanSpeed === true) {
    return true;
  }

  if(appliedSpeed !== null) {
    return true;
  }

  return false;
}

import {
  isPendingActionFilterEnabled,
  getToneDownFilter,
} from './highlighter';

export function isFlightHighlighted(state, ifplId) {
  return isPendingActionFilterEnabled(state) && hasPendingAction(state, ifplId);
}

export function hasPendingAction(state, ifplId) {
  const flight = getFlightByIfplId(state, ifplId);

  if(_.isEmpty(flight)) {
    return false;
  }

  if(isFlightInMcsMode(state, ifplId)) {
    return getMinimumCleanSpeed(state, ifplId) === null;
  }

  const mcs = getMinimumCleanSpeed(state, ifplId);

  // Establish mode
  let advised;
  let applied;

  if(isFlightInSpeedMode(state, ifplId)) {
    // Assume speed mode
    advised = getAdvisedSpeed(state, ifplId);
    applied = getAppliedSpeed(state, ifplId);
  } else {
    advised = getAdvisedMach(state, ifplId) === null ? null : -getAdvisedMach(state, ifplId);
    applied = getAppliedMach(state, ifplId) === null ? null : -getAdvisedMach(state, ifplId);
  }

  return !isActionComplete(advised, applied, mcs);
}

export function hasSetAction(state, ifplId) {
  const flight = getFlightByIfplId(state, ifplId);

  if(_.isEmpty(flight)) {
    return false;
  }

  if(isFlightInMcsMode(state, ifplId)) {
    return getMinimumCleanSpeed(state, ifplId) !== null;
  }

  return (
    getAppliedSpeed(state, ifplId) !== null ||
    getAppliedMach(state, ifplId) !== null ||
    getMinimumCleanSpeed(state, ifplId) !== null
  );
}


export function isFlightTonedDown(state, ifplId) {
  const flight = getFlightByIfplId(state, ifplId);

  const filter = getToneDownFilter(state);

  if(_.isEmpty(flight) || _.isEmpty(filter)) {
    return false;
  }

  const {path, value} = filter;

  // Here we must handle flightLevel rounding
  // Calculate distance between filter FL and flight FL
  // tone down if > 5
  if(path === 'position.vertical.currentFlightLevel') {
    const flightValue = _.get(flight, path);
    const distance = Math.abs(flightValue - value);

    return distance > 5;
  }

  return !_.matchesProperty(path, value)(flight);
}

export function getAppliedBy(state, ifplId) {
  const flight = getFlightByIfplId(state, ifplId);
  return _.get(flight, 'currentStatus', {});
}

export function getAppliedBySectors(state, ifplId) {
  return _.get(getAppliedBy(state, ifplId), 'who.sectors', []);
}

export function getAppliedByCwpName(state, ifplId) {
  return _.get(getAppliedBy(state, ifplId), 'who.cwp.name', '');
}

export function getAppliedByWhen(state, ifplId) {
  return _.get(getAppliedBy(state, ifplId), 'when', 0);
}


import {
  getSectors,
} from '../../../core/selectors/sector';

import {
  getClientId,
  getClientName,
} from '../../../core/selectors/client';

export function getActionAuthor(state) {
  const sectors = getSectors(state) || [];
  const name = getClientName(state) || '';
  const id = getClientId(state) || '';

  return {
    sectors,
    cwp: {
      id,
      name,
    },
  };
}

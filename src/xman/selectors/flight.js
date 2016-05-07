import _ from 'lodash';
import p from './prefix';

import {
  getFlightByIfplId,
} from './flight-list';

import {
  isForcedOff,
} from './status';

export const getAdvisedSpeed = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'advisory.speed', null);
export const getAdvisedMach = (state, ifplId) => {
  const flight = getFlightByIfplId(state, ifplId);
  const fetcher = flight.destination;

  if(isForcedOff(state, fetcher)) {
    return null;
  }

  return _.get(getFlightByIfplId(state, ifplId), 'advisory.machReduction', null);
}

export const getAppliedSpeed = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'currentStatus.speed', null);
export const getAppliedMach = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'currentStatus.machReduction', null);

export const getMinimumCleanSpeed = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'currentStatus.minimumCleanSpeed', false);


export const getTotalDelay = (state, ifplId) => {
  return Math.floor(_.get(getFlightByIfplId(state, ifplId), 'delay', 0) / 60);
};


export const isFlightInSpeedMode = (state, ifplId) => {
  return getAdvisedSpeed(state, ifplId) !== null;
}

export const isFlightInMachMode = (state, ifplId) => !isFlightInSpeedMode(state, ifplId);

export function isActionComplete(advisedSpeed, appliedSpeed, minimumCleanSpeed) {
  if(!advisedSpeed || advisedSpeed === 0) {
    return true;
  }

  if(minimumCleanSpeed === true) {
    return true;
  }

  if(!appliedSpeed) {
    return false;
  }

  if(advisedSpeed >= appliedSpeed) {
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

  const mcs = getMinimumCleanSpeed(state, ifplId);

  // Establish mode
  let advised;
  let applied;

  if(getAdvisedSpeed(state, ifplId) !== null) {
    // Assume speed mode
    advised = getAdvisedSpeed(state, ifplId);
    applied = getAppliedSpeed(state, ifplId);
  } else {
    advised = -getAdvisedMach(state, ifplId);
    applied = -getAppliedMach(state, ifplId);
  }

  return !isActionComplete(advised, applied, mcs);
}

export function isFlightTonedDown(state, ifplId) {
  const flight = getFlightByIfplId(state, ifplId);

  const filter = getToneDownFilter(state);

  if(_.isEmpty(flight) || _.isEmpty(filter)) {
    return false;
  }

  const {path, value} = filter;

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
} from '../../core/selectors/sector';

import {
  getCwpId,
  getCwpName,
} from '../../core/selectors/cwp';

export function getActionAuthor(state) {
  const sectors = getSectors(state) || [];
  const name = getCwpName(state) || '';
  const id = getCwpId(state) || '';

  const cwp = {name, id};
  return {
    sectors,
    cwp: {
      id,
      name,
    },
  };
}

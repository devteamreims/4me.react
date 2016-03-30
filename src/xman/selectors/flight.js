import _ from 'lodash';
import p from './prefix';

import {
  getFlightByIfplId,
} from './flight-list';

const advisedSpeed = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'advisory.speed', null);
const advisedMach = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'advisory.machReduction', null);

const appliedSpeed = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'currentStatus.speed', null);
const appliedMach = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'currentStatus.machReduction', null);

const minimumCleanSpeed = (state, ifplId) => _.get(getFlightByIfplId(state, ifplId), 'currentStatus.minimumCleanSpeed', false);


export const getTotalDelay = (state, ifplId) => {
  return Math.floor(_.get(getFlightByIfplId(state, ifplId), 'delay', 0) / 60);
};


export const isFlightInSpeedMode = (state, ifplId) => {
  return advisedSpeed(state, ifplId) !== null;
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

  const mcs = minimumCleanSpeed(state, ifplId);

  // Establish mode
  let advised;
  let applied;

  if(advisedSpeed(state, ifplId) !== null) {
    // Assume speed mode
    advised = advisedSpeed(state, ifplId);
    applied = appliedSpeed(state, ifplId);
  } else {
    advised = -advisedMach(state, ifplId);
    applied = -appliedMach(state, ifplId);
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

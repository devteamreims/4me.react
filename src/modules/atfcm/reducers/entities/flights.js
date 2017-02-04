// @flow
import type { Action } from '../../../../store';
import R from 'ramda';
import { combineReducers } from 'redux';

import moment from 'moment';

const byIdInitialState = {
  '123': {
    arcid: 'BAW123',
    constraint: {
      beacon: 'CLM',
      flightLevel: 340,
    },
    implementingSector: 'KD',
    onloadSector: 'XR',
  },
  '124': {
    arcid: 'EZY1992',
    constraint: {
      beacon: 'CLM',
      flightLevel: 340,
    },
    implementingSector: 'KD',
    onloadSector: 'XR',
  },
  '125': {
    arcid: 'AFR1012',
    constraint: {
      beacon: 'CLM',
      flightLevel: 360,
    },
    implementingSector: 'KD',
    onloadSector: 'KR',
  },
  '126': {
    arcid: 'MMIKE',
    constraint: {
      beacon: 'REKLA',
      flightLevel: 220,
    },
    implementingSector: 'SE',
    onloadSector: 'SE',
  }
};

function byId(state = byIdInitialState, action) {
  return state;
}

export default combineReducers({
  byId,
});

import globalPrefix from '../rootSelector';
const p = state => globalPrefix(state).entities.flights;

export const getFlightById = (state, id) => p(state).byId[id];

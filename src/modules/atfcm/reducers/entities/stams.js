// @flow
import type { Action } from '../../../../store';
import R from 'ramda';
import { combineReducers } from 'redux';

import {
  DEL_SUCCESS,
  SEND_SUCCESS,
} from '../../actions/stam';

import moment from 'moment';

const byIdInitialState = {
  'running_fox': {
    offloadSector: 'KR',
    flights: ['123', '124'],
    sendTime: null,
    createdAt: moment.utc().subtract(10, 'minutes').toDate(),
    updatedAt: moment.utc().subtract(10, 'minutes').toDate(),
  },
  'walking_snake': {
    offloadSector: 'HYR',
    flights: ['125'],
    sendTime: moment.utc().add(5, 'minutes'),
    createdAt: moment.utc().subtract(10, 'minutes').toDate(),
    updatedAt: moment.utc().subtract(10, 'minutes').toDate(),
  },
  'sprinting_cheetah': {
    offloadSector: 'UH',
    flights: ['126'],
    sendTime: moment.utc().subtract(5, 'minutes'),
    createdAt: moment.utc().subtract(10, 'minutes').toDate(),
    updatedAt: moment.utc().subtract(10, 'minutes').toDate(),
  },
};

const allIdsInitialState = ['running_fox', 'walking_snake', 'sprinting_cheetah'];

function byId(state = byIdInitialState, action) {
  switch(action.type) {
    case DEL_SUCCESS:
      return R.omit([action.id], state);
    case SEND_SUCCESS: {
      const { id, when } = action;

      if(!state[id]) {
        return state;
      }

      const newStam = {
        ...state[id],
        sendTime: when,
      };

      return {
        ...state,
        [id]: newStam,
      };
    }
  }

  return state;
}

function allIds(state = allIdsInitialState, action) {
  switch(action.type) {
    case DEL_SUCCESS:
      return R.without([action.id], state);
  }
  return state;
}

export default combineReducers({
  byId,
  allIds,
});

import globalPrefix from '../rootSelector';
const p = state => globalPrefix(state).entities.stams;

import { getFlightById } from './flights';

export const getStamById = (state, id) => {
  const stam = p(state).byId[id];

  if(!stam) {
    return;
  }

  const flightIds = stam.flights;

  return {
    ...stam,
    id: id,
    flights: flightIds.map(id => getFlightById(state, id)),
  };
};

export const getStams = (state) => {
  return p(state).allIds.map(id => getStamById(state, id));
};

const isStamActive = stam => stam.sendTime && moment(stam.sendTime).isBefore(moment());

const isStamPrepared = stam =>
  stam.sendTime === null ||
  (stam.sendTime && moment(stam.sendTime).isAfter(moment()));

export const getPreparedStams = (state) => getStams(state).filter(isStamPrepared);
export const getActiveStams = (state) => getStams(state).filter(isStamActive);
export const getHistoryStams = (state) => getStams(state);

// @flow
import type { Action } from '../../../store';
import moment from 'moment';
import R from 'ramda';
import { combineReducers } from 'redux';

export type State = Object;

const defaultState: State = {
  entities: {
    stams: {
      byId: {
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
      },
      allIds: ['running_fox', 'walking_snake', 'sprinting_cheetah'],
    },
    flights: {
      byId: {
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
      },
    },
  },
  ui: {},
  socket: {},
};

function entities(state = defaultState.entities, action) {
  return state;
}

import ui from './ui';

export default combineReducers({
  entities,
  ui,
});

// This selector transforms a global state object into a local state object
import p from './rootSelector';

export const getFlightById = (state, id) => p(state).entities.flights.byId[id];

export const getStamById = (state, id) => {
  const stam = p(state).entities.stams.byId[id];

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
  return p(state).entities.stams.allIds.map(id => getStamById(state, id));
};

const isStamActive = stam => stam.sendTime && moment(stam.sendTime).isBefore(moment());

const isStamPrepared = stam =>
  stam.sendTime === null ||
  (stam.sendTime && moment(stam.sendTime).isAfter(moment()));

export const getPreparedStams = (state) => getStams(state).filter(isStamPrepared);
export const getActiveStams = (state) => getStams(state).filter(isStamActive);
export const getHistoryStams = (state) => getStams(state);

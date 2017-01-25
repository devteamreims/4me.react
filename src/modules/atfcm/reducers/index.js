// @flow
import type { Action } from '../../../store';
import moment from 'moment';
import R from 'ramda';

export type State = Object;

const defaultState: State = {
  entities: {
    stams: {
      byId: {
        'running_fox': {
          offloadSector: 'KR',
          flights: ['123', '124'],
          sendTime: null,
        },
        'walking_snake': {
          offloadSector: 'HYR',
          flights: ['125'],
          sendTime: moment.utc().add(5, 'minutes'),
        },
      },
      allIds: ['running_fox', 'walking_snake'],
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
      },
    },
  },
  ui: {},
  socket: {},
};

export default function exampleReducer(state: State = defaultState, action: Action): State {
  if(action) {
    return state;
  }
  return state;
}

const p = state => state.atfcm;

export const getFlightById = (state, id) => p(state).entities.flights.byId[id];

export const getStamById = (state, id) => {
  const stam = p(state).entities.stams.byId[id];

  if(!stam) {
    return;
  }

  const flightIds = stam.flights;

  return {
    ...stam,
    stamId: id,
    flights: flightIds.map(id => getFlightById(state, id)),
  };
};

export const getStams = (state) => {
  return p(state).entities.stams.allIds.map(id => getStamById(state, id));
};

export const getPreparedStams = (state) => getStams(state);
export const getActiveStams = (state) => getStams(state);
export const getHistoryStams = (state) => getStams(state);

// @flow
import type { Action, RootState, Selector } from '../../../../store';
import R from 'ramda';
import { combineReducers } from 'redux';

import {
  ADD_SUCCESS,
  DEL_SUCCESS,
  REMOVE_ORPHANS,
} from '../../actions/flight';

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
    implementingSector: 'KF',
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
  },
  '127': {
    arcid: 'EZY1019',
    constraint: {
      beacon: 'CLM',
      flightLevel: 360,
    },
    implementingSector: 'KD',
    onloadSector: 'KR',
  }
};

import type {
  FlightId,
  Flight,
} from '../../types';

type ByIdState = {
  [key: FlightId]: Flight,
};


function byId(state: ByIdState = byIdInitialState, action: Action): ByIdState {
  switch(action.type) {
    case ADD_SUCCESS: {
      const { flight, stamId } = action;
      if(!flight || !stamId || !flight.id) {
        return state;
      }

      return {
        ...state,
        [flight.id]: R.omit(['id'], flight)
      };
    }
    case DEL_SUCCESS: {
      return R.omit([action.id], state);
    }
    case REMOVE_ORPHANS: {
      return R.omit(action.ids, state);
    }
  }

  return state;
}

export type State = {
  byId: ByIdState,
};

export default combineReducers({
  byId,
});

import globalPrefix from '../rootSelector';
const p: Selector<State> = state => globalPrefix(state).entities.flights;

export const getFlightById = (state: RootState, id: string): ?Flight => {
  const flight = p(state).byId[id];

  if(!flight) {
    return null;
  }

  return {
    id,
    ...flight,
  };
};

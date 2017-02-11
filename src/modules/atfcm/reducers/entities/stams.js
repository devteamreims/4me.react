// @flow
import type { Action, Selector, RootState } from '../../../../store';
import R from 'ramda';
import { combineReducers } from 'redux';

import {
  ADD_SUCCESS,
  DEL_SUCCESS,
  SEND_SUCCESS,
  ARCHIVE_SUCCESS,
} from '../../actions/stam';

import {
  ADD_SUCCESS as ADD_FLIGHT_SUCCESS,
  DEL_SUCCESS as DEL_FLIGHT_SUCCESS,
} from '../../actions/flight';

import moment from 'moment';

const byIdInitialState = {
  'running_fox': {
    offloadSector: 'KR',
    flights: ['123', '124'],
    sendTime: null,
    archiveTime: null,
    createdAt: moment.utc().subtract(10, 'minutes').toDate(),
    updatedAt: moment.utc().subtract(10, 'minutes').toDate(),
  },
  'walking_snake': {
    offloadSector: 'HYR',
    flights: ['125'],
    sendTime: moment.utc().add(5, 'minutes').toDate(),
    archiveTime: null,
    createdAt: moment.utc().subtract(10, 'minutes').toDate(),
    updatedAt: moment.utc().subtract(10, 'minutes').toDate(),
  },
  'sprinting_cheetah': {
    offloadSector: 'UH',
    flights: ['126'],
    sendTime: moment.utc().subtract(5, 'minutes').toDate(),
    archiveTime: null,
    createdAt: moment.utc().subtract(10, 'minutes').toDate(),
    updatedAt: moment.utc().subtract(10, 'minutes').toDate(),
  },
  'crawling_creeter': {
    offloadSector: 'UH',
    flights: ['127'],
    sendTime: moment.utc().subtract(8, 'minutes').toDate(),
    archiveTime: moment.utc().subtract(5, 'minutes').toDate(),
    createdAt: moment.utc().subtract(10, 'minutes').toDate(),
    updatedAt: moment.utc().subtract(10, 'minutes').toDate(),
  },
};

const allIdsInitialState = ['running_fox', 'walking_snake', 'sprinting_cheetah', 'crawling_creeter'];

import type {
  StamId,
  StateStam,
  Stam,
  PreparedStam,
  HistoryStam,
  ActiveStam,
  Flight,
} from '../../types';

type ByIdState = {
  [key: StamId]: StateStam,
};


function byId(state: ByIdState = byIdInitialState, action: Action) {
  switch(action.type) {
    case ADD_FLIGHT_SUCCESS: {
      const { flight, stamId } = action;
      if(!flight || !flight.id || !stamId || !state[stamId]) {
        return state;
      }

      const stam = state[stamId];

      if(stam.flights.includes(flight.id)) {
        // Nothing has changed here
        return state;
      }

      const flights = [...stam.flights, flight.id];

      // Add new flight to the stam
      const newStam = {
        ...stam,
        flights: Array.from(new Set(flights)),
      };

      return {
        ...state,
        [stamId]: newStam,
      };
    }
    case ADD_SUCCESS: {
      const { stam } = action;
      return {
        ...state,
        [stam.id]: R.omit(['id'], stam),
      };
    }
    case DEL_SUCCESS:
      return R.omit([action.id], state);
    case DEL_FLIGHT_SUCCESS: {
      const unlinkDeletedFlight = id => stam => {
        if(stam.flights.includes(id)) {
          // Remove specific flight id from references
          const flights = R.without([id], stam.flights);
          // Remove send time from stam if we removed the only flight
          const sendTime = flights.length ? stam.sendTime : null;

          return {
            ...stam,
            flights,
            sendTime,
          };
        }

        return stam;
      };

      const { id: flightId } = action;

      return R.mapObjIndexed(unlinkDeletedFlight(flightId), state);
    }
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
    case ARCHIVE_SUCCESS: {
      const { id, when } = action;

      if(!state[id]) {
        return state;
      }

      const newStam = {
        ...state[id],
        archiveTime: when,
      };

      return {
        ...state,
        [id]: newStam,
      };
    }
  }

  return state;
}

type AllIdsState = Array<StamId>;

function allIds(state: AllIdsState = allIdsInitialState, action: Action) {
  switch(action.type) {
    case ADD_SUCCESS: {
      const { stam } = action;
      const { id } = stam;

      if(!id) {
        return state;
      }

      return [
        id,
        ...R.without([id], state),
      ];
    }
    case DEL_SUCCESS:
      return R.without([action.id], state);
  }
  return state;
}

export type State = {
  byId: ByIdState,
  allIds: AllIdsState,
};

export default combineReducers({
  byId,
  allIds,
});

import globalPrefix from '../rootSelector';
const p: Selector<State> = state => globalPrefix(state).entities.stams;

import { getFlightById } from './flights';

export const getStamById = (state: RootState, id: string): ?Stam => {
  const stam = p(state).byId[id];

  if(!stam) {
    return null;
  }

  const flightIds = stam.flights;

  const newStam: Object = Object.assign({}, stam); // Cast to plain Object type ...

  const flights: Array<Flight> = flightIds
    .map(id => getFlightById(state, id))
    .filter(Boolean);

  const r: Stam = {
    ...newStam,
    id,
    flights,
  };

  return r;
};

export const getStams: Selector<Array<Stam>> = (state) => {
  return p(state).allIds
    .map(id => getStamById(state, id))
    .filter(Boolean); // Remove null values, syntax is weirdish to accomodate flowtype
};


export const isStamPrepared = (stam: Stam): boolean => !!(
  stam.sendTime === null ||
  (stam.sendTime && moment(stam.sendTime).isAfter(moment()))
);

export const isStamArchived = (stam: Stam): boolean => !!(
  stam.archiveTime && moment(stam.archiveTime).isBefore(moment())
);

export const isStamActive = (stam: Stam): boolean => !!(
  stam.sendTime &&
  moment(stam.sendTime).isBefore(moment()) &&
  !isStamArchived(stam)
);


export const getPreparedStams: Selector<Array<PreparedStam>> = (state) => getStams(state).filter(isStamPrepared);
export const getActiveStams: Selector<Array<ActiveStam>> = (state) => getStams(state).filter(isStamActive);
export const getHistoryStams: Selector<Array<HistoryStam>> = (state) => getStams(state).filter(isStamArchived);

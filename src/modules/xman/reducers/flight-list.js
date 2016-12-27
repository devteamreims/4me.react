import merge from 'lodash/merge';
import _ from 'lodash';

import {
  REFRESH,
  COMPLETE,
  FAIL,
  CLEAR,
  UPDATE_FLIGHT,
} from '../actions/flight-list';

import {
  SET_MACH,
  SET_SPEED,
  SET_MCS,
  CLEAR_ACTION,
} from '../actions/flight';

import {
  SET_FILTER,
} from '../actions/list-filter';

import {
  DISCONNECTED as SOCKET_DISCONNECTED,
} from '../actions/socket';

const defaultState = {
  isLoading: false,
  flights: [],
  error: null,
  listFilter: 'all'
};

export default function flightListReducer(state = defaultState, action) {
  switch(action.type) {
    case SET_MACH:
    case SET_SPEED:
    case SET_MCS:
    case CLEAR_ACTION:
      return Object.assign({}, state, {
        flights: _.map(state.flights, flightByFlightReducer(action))
      });
    case REFRESH:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });
    case COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        flights: action.flights,
        error: null
      });
    case SOCKET_DISCONNECTED:
      return Object.assign({}, state, {
        isLoading: false,
        flights: [],
        error: 'Socket disconnected'
      });
    case CLEAR:
      return Object.assign({}, state, {
        flights: [],
      });
    case FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        flights: [],
        error: action.error
      });
    case SET_FILTER:
      return merge({}, state, {
        listFilter: action.value
      });
    case UPDATE_FLIGHT:
      return Object.assign({}, state, {
        flights: updateFlights(state, action.flight)
      });
  }
  return state;
}

function updateFlights(state, flight) {
  const updatedFlightId = _.get(flight, 'ifplId', null);


  const oldFlightIndex = _.findIndex(state.flights, f => f.ifplId === updatedFlightId);
  const oldFlight = state.flights[oldFlightIndex];

  console.log(`Updating flight, index is ${oldFlightIndex}`);
  console.log(oldFlight);

  return [
    ...state.flights.slice(0, oldFlightIndex),
    flight,
    ...state.flights.slice(oldFlightIndex + 1)
  ];
}


function flightByFlightReducer(action) {
  return (flight) => {
    if(!action.ifplId || flight.ifplId !== action.ifplId) {
      return flight;
    }
    switch(action.type) {
      case SET_MACH:
        return merge({}, flight, {
          currentStatus: {
            machReduction: action.machReduction,
            when: Date.now(),
            who: action.who
          }
        });
      case SET_MCS:
        return merge({}, flight, {
          currentStatus: {
            minimumCleanSpeed: action.minimumCleanSpeed,
            when: Date.now(),
            who: action.who
          }
        });
      case SET_SPEED:
        return merge({}, flight, {
          currentStatus: {
            speed: action.speed,
            when: Date.now(),
            who: action.who
          }
        });
      case CLEAR_ACTION:
        return Object.assign({}, flight, {
          currentStatus: {
            minimumCleanSpeed: false,
            machReduction: null,
            speed: null,
            when: Date.now(),
            who: action.who
          }
        });
    }
    return flight;
  };
}

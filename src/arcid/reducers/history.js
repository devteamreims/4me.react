const defaultState = {
  lastUpdated: null,
  isLoading: false,
  error: null,
  flights: [],
};


import {
  FETCH_START,
  FETCH_COMPLETE,
  OPTIMISTIC_ADD,
} from '../actions/history';

const emptyHistory = [];

export default function historyReducer(state = defaultState, action) {
  switch(action.type) {
    case FETCH_START:
      return Object.assign({}, state, {isLoading: true, error: null});
    case FETCH_COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error || null,
        flights: action.flights || emptyHistory,
        lastUpdated: Date.now(),
      });
    case OPTIMISTIC_ADD:
      return Object.assign({}, state, {
        flights: [
          action.flight,
          ..._.reject(state.flights, f => f.ifplId === action.flight.ifplId),
        ],
      });
  }
  return state;
}

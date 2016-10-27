import {
  START,
  COMPLETE,
  ERROR,
  CLEAR_RESULTS,
} from '../actions/query';

/*
import {
  START as PROFILE_START,
} from '../actions/profile';
*/

const defaultState = {
  isLoading: false,
  callsign: '',
  error: null,
  flights: [],
};

export default function queryReducer(state = defaultState, action) {
  switch(action.type) {
    case START:
      return Object.assign({}, state, {
        isLoading: true,
        callsign: action.callsign,
        flights: [],
      });
    case COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        error: null,
        flights: action.flights,
      });
    case ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
        flights: [],
        callsign: '',
      });
    case CLEAR_RESULTS:
      return Object.assign({}, state, defaultState);
/*    case PROFILE_START:
      return Object.assign({}, state, {error: null});*/
  }
  return state;
}

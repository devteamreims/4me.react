import {
  FETCH,
  COMPLETE,
  ERROR,
} from '../actions/cwp';

const defaultState = {
  isLoading: true,
  lastUpdated: Date.now(),
  cwps: [],
};

export default function cwpReducer(state = defaultState, action) {
  switch(action.type) {
    case FETCH:
      return Object.assign({}, state, {
        isLoading: true,
        cwps: []
      });
    case COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        lastUpdated: Date.now(),
        cwps: [...action.cwps]
      });
    case ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        lastUpdated: Date.now(),
        cwps: []
      });
  }
  return state;
}

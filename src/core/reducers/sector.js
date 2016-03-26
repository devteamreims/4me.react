import {
  FETCH,
  COMPLETE,
  ERROR,
} from '../actions/sector';

const defaultState = {
  isBootstrapped: false,
  isLoading: false,
  sectors: [],
  error: null,
};

export default function cwpReducer(state = defaultState, action) {
  switch(action.type) {
    case FETCH:
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
      });
    case COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        isBootstrapped: true,
        sectors: [...action.sectors],
      });
    case ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        sectors: [],
        error: action.error,
      });
  }

  return state;
}

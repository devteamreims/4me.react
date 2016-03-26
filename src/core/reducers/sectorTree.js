import {
  FETCH,
  COMPLETE,
  ERROR,
} from '../actions/sectorTree';

const defaultState = {
  isLoading: false,
  sectorTree: null,
  error: null,
};

export default function cwpReducer(state = defaultState, action) {
  switch(action.type) {
    case FETCH:
      return Object.assign({}, state, {isLoading: true, error: null});
    case COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        sectorTree: [...action.sectorTree],
      });
    case ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        sectorTree: null,
        error: action.error,
      });
  }

  return state;
}

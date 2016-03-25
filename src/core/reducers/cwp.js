import {
  FETCH,
  COMPLETE,
  ERROR,
} from '../actions/cwp';

import _ from 'lodash';

const defaultState = {
  isLoading: false,
  cwp: null,
  error: null,
};

export default function cwpReducer(state = defaultState, action) {
  switch(action.type) {
    case FETCH:
      return Object.assign({}, state, {isLoading: true});
    case COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        cwp: _.merge({}, action.cwp),
      });
    case ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        cwp: null,
        error: action.error,
      });
  }

  return state;
}

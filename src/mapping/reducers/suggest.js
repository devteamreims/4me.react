import _ from 'lodash';


import {
  FETCH,
  COMPLETE,
  FAIL
} from '../actions/suggest';

const defaultState = {
  isLoading: false,
  cwpId: null,
  lastUpdated: Date.now(),
  suggestions: [],
  error: null
};

export default function suggestReducer(state = defaultState, action) {
  switch(action.type) {
    case FETCH:
      return Object.assign({}, state, {
        isLoading: true,
        cwpId: action.cwpId,
        suggestions: [],
        error: null
      });
    case COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        lastUpdated: Date.now(),
        cwpId: action.cwpId,
        suggestions: [...action.suggestions],
        error: null
      });
    case FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        lastUpdated: Date.now(),
        cwpId: action.cwpId,
        suggestions: [],
        error: action.error
      });
  }
  return state;
}

import _ from 'lodash';

import {
  FETCH,
  FETCH_COMPLETE,
  FETCH_FAIL,
  COMMIT,
  COMMIT_COMPLETE,
  COMMIT_FAIL,
} from '../actions/map';

const defaultState = {
  isLoading: true,
  lastUpdated: Date.now(),
  map: [],
  refreshError: null,
  commitError: null,
};

export default function mapReducer(state = defaultState, action) {
  switch(action.type) {
    case FETCH:
      return Object.assign({}, state, {
        isLoading: true,
        map: [],
      });
    case FETCH_COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        lastUpdated: Date.now(),
        map: [...action.map],
        refreshError: null,
      });
    case FETCH_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        lastUpdated: Date.now(),
        refreshError: action.error,
        map: [],
      });
    case COMMIT:
      return Object.assign({}, state, {
        isLoading: true,
        commitError: null,
      });
    case COMMIT_COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case COMMIT_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        commitError: action.error,
      });
  }
  return state;
}

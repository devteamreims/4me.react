import _ from 'lodash';

import {
  FETCH,
  FETCH_COMPLETE,
  FETCH_FAIL,
  COMMIT,
  COMMIT_COMPLETE,
  COMMIT_FAIL,
  SET_CWP_STATUS,
} from '../actions/map';

const defaultState = {
  isLoading: true,
  isCommitting: false,
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
        isCommitting: true,
        commitError: null,
      });
    case COMMIT_COMPLETE:
      return Object.assign({}, state, {
        isCommitting: false,
      });
    case COMMIT_FAIL:
      return Object.assign({}, state, {
        isCommitting: false,
        commitError: action.error,
      });
    case SET_CWP_STATUS:
      return handleCwpStatus(state, action);
  }
  return state;
}

function handleCwpStatus(state, action) {
  if(action.type !== SET_CWP_STATUS) {
    return state;
  }

  const cwpId = action.cwpId;

  const cwp = _.find(state.map, cwp => cwp.cwpId === cwpId) || {};
  const map = _.reject(state.map, cwp => cwp.cwpId === cwpId);

  // This CWP is not in our map and we are trying to enable it
  // Nothing to do
  if(_.isEmpty(cwp) && action.disabled === false) {
    return state;
  }

  return Object.assign({}, state, {
    map: [
      ...map,
      Object.assign({}, {
        cwpId,
        disabled: action.disabled,
        sectors: cwp.sectors || [],
      }),
    ]
  });
}

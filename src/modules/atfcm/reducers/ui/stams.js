// @flow
import {
  DEL_REQUEST,
  DEL_SUCCESS,
  DEL_FAILURE,
} from '../../actions/stam';

import { combineReducers } from 'redux';
import R from 'ramda';

const loadingInitialState = [];

function loading(state = loadingInitialState, action) {
  switch(action.type) {
    case DEL_REQUEST: {
      const { id } = action;
      return [id, ...R.without([id], state)];
    }
    case DEL_SUCCESS:
    case DEL_FAILURE: {
      const { id } = action;
      return R.without([id], state);
    }
  }

  return state;
}


const stamsReducer = combineReducers({
  loading,
});

export default stamsReducer;

import globalPrefix from '../rootSelector';
const p = state => globalPrefix(state).ui.stams;

export const getLoadingIds = (state) => p(state).loading;
export const isLoading = (state, id) => getLoadingIds(state).contains(id);

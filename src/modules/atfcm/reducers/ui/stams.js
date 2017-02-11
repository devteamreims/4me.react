// @flow
import type { Action, RootState, Selector } from '../../../../store';
import {
  DEL_REQUEST,
  DEL_SUCCESS,
  DEL_FAILURE,
  SEND_SUCCESS,
  SEND_REQUEST,
  SEND_FAILURE,
  ARCHIVE_SUCCESS,
  ARCHIVE_REQUEST,
  ARCHIVE_FAILURE,
} from '../../actions/stam';

import { combineReducers } from 'redux';
import R from 'ramda';

const loadingInitialState = [];

import type { StamId } from '../../types';
type LoadingState = Array<StamId>;
function loading(state: LoadingState = loadingInitialState, action: Action) {
  switch(action.type) {
    case SEND_REQUEST:
    case ARCHIVE_REQUEST:
    case DEL_REQUEST: {
      const { id } = action;
      return [id, ...R.without([id], state)];
    }
    case SEND_FAILURE:
    case SEND_SUCCESS:
    case ARCHIVE_SUCCESS:
    case ARCHIVE_FAILURE:
    case DEL_SUCCESS:
    case DEL_FAILURE: {
      const { id } = action;
      return R.without([id], state);
    }
  }

  return state;
}

export type State = {
  loading: LoadingState,
};
const stamsReducer = combineReducers({
  loading,
});

export default stamsReducer;

import globalPrefix from '../rootSelector';
const p: Selector<State> = state => globalPrefix(state).ui.stams;

export const getLoadingIds: Selector<Array<StamId>> = (state) => p(state).loading;
export const isLoading = (state: RootState, id: string): boolean => getLoadingIds(state).includes(id);

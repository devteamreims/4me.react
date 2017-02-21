// @flow
import type { Action, Selector, RootState } from '../../../../store';
import {
  DEL_REQUEST,
  DEL_SUCCESS,
  DEL_FAILURE,
  HIDE,
  UNHIDE,
  REMOVE_ORPHANS,
} from '../../actions/flight';

import { combineReducers } from 'redux';
import R from 'ramda';

const loadingInitialState = [];

import type { FlightId } from '../../types';

type LoadingState = Array<FlightId>;
function loading(state: LoadingState = loadingInitialState, action: Action) {
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

const hiddenInitialState = [];

type HiddenState = Array<FlightId>;
function hidden(state: HiddenState = hiddenInitialState, action: Action) {
  switch(action.type) {
    case HIDE: {
      const { id } = action;
      return [id, ...R.without([id], state)];
    }
    case DEL_SUCCESS:
    case UNHIDE: {
      const { id } = action;
      return R.without([id], state);
    }
    case REMOVE_ORPHANS: {
      const { ids } = action;
      return R.without(ids, state);
    }
  }

  return state;
}

export type State = {
  loading: LoadingState,
  hidden: HiddenState,
};
const flightsReducer = combineReducers({
  loading,
  hidden,
});

export default flightsReducer;

import globalPrefix from '../rootSelector';
const p: Selector<State> = state => globalPrefix(state).ui.flights;

export const getLoadingIds: Selector<Array<FlightId>> = (state) => p(state).loading;
export const isLoading = (state: RootState, id: string): boolean => getLoadingIds(state).includes(id);

export const getHiddenIds: Selector<Array<FlightId>> = (state) => p(state).hidden;
export const isHidden = (state: RootState, id: string): boolean => getHiddenIds(state).includes(id);

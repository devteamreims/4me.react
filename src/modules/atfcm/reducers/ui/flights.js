// @flow
import type { Action, Selector, RootState } from '../../../../store';
import {
  DEL_REQUEST,
  DEL_SUCCESS,
  DEL_FAILURE,
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

export type State = {
  loading: LoadingState,
};
const flightsReducer = combineReducers({
  loading,
});

export default flightsReducer;

import globalPrefix from '../rootSelector';
const p: Selector<State> = state => globalPrefix(state).ui.flights;

export const getLoadingIds: Selector<Array<FlightId>> = (state) => p(state).loading;
export const isLoading = (state: RootState, id: string): boolean => getLoadingIds(state).includes(id);

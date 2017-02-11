// @flow
import type { Action, RootState, Selector } from '../../../../store';
import {
  AUTOCOMPLETE_REQUEST,
  AUTOCOMPLETE_SUCCESS,
  AUTOCOMPLETE_FAILURE,
} from '../../actions/autocomplete';

const loadingInitialState = {
  error: null,
  loading: false,
  flights: [
    'AFR1012',
    'EZY1912',
    'BAW164',
    'LION45',
    'MMIKE',
    'AZA104',
    'BAW132',
  ],
};
export type State = {
  error: ?string,
  loading: boolean,
  flights: Array<string>,
};

export default function autocompleteReducer(state: State = loadingInitialState, action: Action) {
  switch(action.type) {
    case AUTOCOMPLETE_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case AUTOCOMPLETE_SUCCESS: {
      const { flights } = action;
      return {
        error: null,
        loading: false,
        flights,
      };
    }
    case AUTOCOMPLETE_FAILURE: {
      const { error } = action;
      return {
        ...state,
        loading: false,
        error,
      };
    }
  }

  return state;
}


import globalPrefix from '../rootSelector';
const p: Selector<State> = state => globalPrefix(state).ui.autocomplete;

export const isLoading: Selector<boolean> = (state) => !!p(state).loading;
export const getError: Selector<?string> = (state) => p(state).error;
export const getFlights: Selector<Array<string>> = (state) => p(state).flights;

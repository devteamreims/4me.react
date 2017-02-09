// @flow
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

export default function autocompleteReducer(state = loadingInitialState, action) {
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
const p = state => globalPrefix(state).ui.autocomplete;

export const isLoading = (state) => !!p(state).loading;
export const getError = (state) => p(state).error;
export const getFlights = (state) => p(state).flights;

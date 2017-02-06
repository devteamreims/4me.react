// @flow

import {
  HIDE_FORM,
  SHOW_FORM,
  TOUCH_FORM,
} from '../../actions/flight';

const initialState = {
  error: {
    message: 'Connection timeout',
    fields: {
      implementingSector: 'BLABLA',
    },
  },
  loading: false,
  openedForStamId: null,
  flightId: null,
};

export default function addFlightFormReducer(state = initialState, action) {
  switch(action.type) {
    case SHOW_FORM: {
      const {
        stamId,
        flightId,
      } = action;

      return {
        ...state,
        openedForStamId: stamId,
        flightId,
      };
    }
    case HIDE_FORM: {
      return {
        ...initialState,
      };
    }
    case TOUCH_FORM: {
      return {
        ...state,
        error: null,
      };
    }
  }
  return state;
}


import globalPrefix from '../rootSelector';
const p = state => globalPrefix(state).ui.addFlightForm;

export const isOpenedForStamId = (state, stamId) =>
  p(state).openedForStamId !== null &&
  stamId === p(state).openedForStamId;

export const getFlightId = (state) => p(state).flightId;
export const isOpened = (state) => !!p(state).openedForStamId;
export const isLoading = state => !!p(state).loading;

export const getErrorMessage = state => {
  if(!p(state).error || !p(state).error.message) {
    return null;
  }

  return p(state).error.message;
};

export const getFieldErrors = state => {
  if(!p(state).error || !p(state).error.fields) {
    return null;
  }

  return p(state).error.fields;
};

// @flow

import {
  HIDE_FORM,
  SHOW_FORM,
  TOUCH_FORM,
  ADD_REQUEST,
  ADD_SUCCESS,
  ADD_FAILURE,
} from '../../actions/flight';

const initialState = {
  error: null,
  loading: false,
  visible: false,
  stamId: null,
  flightId: null,
};

export default function addFlightModalReducer(state = initialState, action) {
  switch(action.type) {
    case SHOW_FORM: {
      const {
        stamId,
        flightId,
      } = action;

      return {
        ...state,
        visible: true,
        stamId,
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
    case ADD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ADD_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case ADD_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
  }
  return state;
}


import globalPrefix from '../rootSelector';
const p = state => globalPrefix(state).ui.addFlightModal;

export const isVisible = (state) => p(state).visible;
export const getStamId = (state) => p(state).stamId;
export const getFlightId = (state) => p(state).flightId;
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

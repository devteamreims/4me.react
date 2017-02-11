// @flow
import type { Action, Selector } from '../../../../store';
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

import type {
  FlightId,
  StamId,
  ValidationError,
} from '../../types';

export type State = {
  error: ?ValidationError,
  loading: boolean,
  visible: boolean,
  stamId: ?StamId,
  flightId: ?FlightId,
};

export default function addFlightModalReducer(state: State = initialState, action: Action) {
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
        flightId: null,
        stamId: null,
        visible: false,
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
const p: Selector<State> = state => globalPrefix(state).ui.addFlightModal;

export const isVisible: Selector<boolean> = (state) => p(state).visible;
export const getStamId: Selector<?StamId> = (state) => p(state).stamId;
export const getFlightId: Selector<?FlightId> = (state) => p(state).flightId;
export const isLoading: Selector<boolean> = state => !!p(state).loading;

export const getErrorMessage: Selector<?string> = state => {
  const err = p(state).error;
  if(!err) {
    return null;
  }

  return err.message;
};

export const getFieldErrors: Selector<?{[key: string]: ?string}> = state => {
  const err = p(state).error;
  if(!err) {
    return null;
  }

  return err.fields;
};

// @flow

import type { Action, RootState, Selector } from '../../../../store';

import {
  SHOW_ADD_DIALOG,
  HIDE_ADD_DIALOG,
  TOUCH_ADD_STAM_FORM,
  ADD_REQUEST,
  ADD_SUCCESS,
  ADD_FAILURE,
} from '../../actions/stam';


const initialState = {
  visible: false,
  error: null,
  loading: false,
};

import type { ValidationError } from '../../types';

export type State = {
  visible: boolean,
  error: ?ValidationError,
  loading: boolean,
};

export default function addStamModalReducer(state: State = initialState, action: Action) {
  switch(action.type) {
    case ADD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ADD_SUCCESS: {
      return {
        ...state,
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
    case SHOW_ADD_DIALOG: {
      return {
        ...state,
        visible: true,
        error: null,
      };
    }
    case HIDE_ADD_DIALOG: {
      return {
        ...state,
        visible: false,
        error: null,
      };
    }
    case TOUCH_ADD_STAM_FORM: {
      return {
        ...state,
        error: null,
      };
    }
  }
  return state;
}


import globalPrefix from '../rootSelector';
const p: Selector<State> = state => globalPrefix(state).ui.addStamModal;

export const isVisible: Selector<boolean> = state => !!p(state).visible;
export const isLoading: Selector<boolean> = state => !!p(state).loading;

export const getErrorMessage: Selector<?string> = state => {
  const slice = p(state);
  if(!slice.error) {
    return null;
  }

  return slice.error.message;
};

export const getFieldErrors: Selector<?{[key: string]: ?string}> = state => {
  const slice = p(state);

  if(!slice.error) {
    return null;
  }

  return slice.error.fields;
};

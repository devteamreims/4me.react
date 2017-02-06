// @flow
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

export default function addStamModalReducer(state = initialState, action) {
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
const p = state => globalPrefix(state).ui.addStamModal;

export const isVisible = state => !!p(state).visible;
export const isLoading = state => !!p(state).loading;
export const getErrorMessage = state => p(state).error === null ? null : p(state).error.message;
export const getFieldErrors = state => p(state).error === null ? null : p(state).error.fields;

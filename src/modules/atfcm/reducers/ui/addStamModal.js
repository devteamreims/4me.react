// @flow
import {
  SHOW_ADD_DIALOG,
  HIDE_ADD_DIALOG,
} from '../../actions/stam';


const initialState = {
  visible: false,
  error: null,
};

export default function addStamModalReducer(state = initialState, action) {
  switch(action.type) {
    case SHOW_ADD_DIALOG: {
      return {
        ...state,
        visible: true,
      };
    }
    case HIDE_ADD_DIALOG: {
      return {
        ...state,
        visible: false,
      };
    }
  }
  return state;
}


import p from '../rootSelector';

export const isVisible = state => !!p(state).ui.addStamModal.visible;

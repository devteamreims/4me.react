import _ from 'lodash';
import merge from 'lodash/merge';

import {
  TOGGLE_PENDING_ACTION,
  SET_TONE_DOWN,
  CLEAR_TONE_DOWN,
} from '../actions/highlighter';

const defaultState = {
  pendingAction: true,
  toneDown: {}
};

export default function(state = defaultState, action) {
  switch(action.type) {
    case TOGGLE_PENDING_ACTION:
      return merge({}, state, {
        pendingAction: !state.pendingAction
      });
    case SET_TONE_DOWN:
      return merge({}, state, {
        toneDown: {
          path: action.path,
          value: action.value
        }
      });
    case CLEAR_TONE_DOWN:
      return Object.assign({}, state, {
        toneDown: undefined
      });
  }
  return state;
}

import {
  RESET_TIMER,
  ENABLE,
  DISABLE,
} from '../actions/returnToDashboard';

const defaultState = {
  lastUserInteraction: Date.now(),
  enabled: false,
  targetRoute: null,
  interval: 90 * 1000, // 90 seconds
};

export default function lastUserInteraction(state = defaultState, action) {
  switch(action.type) {
    case RESET_TIMER:
      return Object.assign({}, state, {
        lastUserInteraction: Date.now(),
      });
    case ENABLE:
      return Object.assign({}, state, {
        enabled: true,
        targetRoute: action.targetRoute || '/',
        lastUserInteraction: Date.now(),
      });
    case DISABLE:
      return Object.assign({}, state, {
        enabled: false,
        lastUserInteraction: null,
      });
  }

  return state;
}

const defaultState = {
  connected: false,
  lastUpdated: Date.now(),
  error: 'Connection to backend failed (websocket)',
};


import {
  CONNECTED,
  DISCONNECTED,
} from '../actions/socket';

export default function statusReducer(state = defaultState, action) {
  switch(action.type) {
    case CONNECTED:
      return Object.assign({}, state, {
        connected: true,
        lastUpdated: Date.now(),
        error: null,
      });
    case DISCONNECTED:
      return Object.assign({}, state, defaultState, {lastUpdated: Date.now()});
  }
  return state;
}

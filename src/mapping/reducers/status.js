import { combineReducers } from 'redux';

import {
  CONNECTED as SOCKET_CONNECTED,
  DISCONNECTED as SOCKET_DISCONNECTED,
} from '../actions/socket';

const defaultSocketState = {
  connected: false,
  lastUpdated: Date.now(),
};

function socketReducer(state = defaultSocketState, action) {
  switch(action.type) {
    case SOCKET_CONNECTED:
      return Object.assign({}, state, {
        connected: true,
        lastUpdated: Date.now(),
      });
    case SOCKET_DISCONNECTED:
      return Object.assign({}, state, {
        connected: false,
        lastUpdated: Date.now(),
      });
  }
  return state;
}

export default combineReducers({
  socket: socketReducer,
});

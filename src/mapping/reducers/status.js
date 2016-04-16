import _ from 'lodash';

import {
  CONNECTED as SOCKET_CONNECTED,
  DISCONNECTED as SOCKET_DISCONNECTED,
} from '../actions/socket';

const defaultState = {
  level: 'normal',
  lastUpdated: Date.now(),
  message: ''
};

export default function statusReducer(state = defaultState, action) {
  switch(action.type) {
    case SOCKET_CONNECTED:
      return Object.assign({}, state, {
        level: 'normal',
        lastUpdated: Date.now(),
        message: ''
      });
    case SOCKET_DISCONNECTED:
      return Object.assign({}, state, {
        level: 'critical',
        lastUpdated: Date.now(),
        message: 'Lost socket connection to backend'
      });
  }
  return state;
}

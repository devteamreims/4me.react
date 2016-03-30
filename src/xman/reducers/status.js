import _ from 'lodash';

import {
  COMPLETE as REFRESH_COMPLETE,
  FAIL as REFRESH_FAIL,
} from '../actions/flight-list';

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
    case REFRESH_COMPLETE:
      return Object.assign({}, state, {
        level: 'normal',
        lastUpdated: Date.now(),
        message: ''
      });
    case REFRESH_FAIL:
      return Object.assign({}, state, {
        level: 'critical',
        lastUpdated: Date.now(),
        message: `Refresh from backend failed : ${action.error}`
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

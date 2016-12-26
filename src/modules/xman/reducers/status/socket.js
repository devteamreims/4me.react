import {
  CONNECTED as SOCKET_CONNECTED,
  DISCONNECTED as SOCKET_DISCONNECTED,
} from '../../actions/socket';

const defaultState = {
  status: 'error',
  lastUpdated: Date.now(),
};

export default function socketStatusReducer(state = defaultState, action) {
  switch(action.type) {
    case SOCKET_CONNECTED:
      return Object.assign({}, defaultState, {status: 'normal', lastUpdated: Date.now()});
    case SOCKET_DISCONNECTED:
      return Object.assign({}, state, {status: 'error', lastUpdated: Date.now()});
  }

  return state;
}

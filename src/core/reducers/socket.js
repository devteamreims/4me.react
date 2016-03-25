import {
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
} from '../actions/socket';

const defaultState = {
  isLoading: false,
  isConnected: false,
  error: null,
};

export default function socketReducer(state = defaultState, action) {
  switch(action.type) {
    case CONNECTING:
      return Object.assign({}, state, {
        isLoading: true,
        isConnected: false,
      });
    case CONNECTED:
      return Object.assign({}, state, {
        isLoading: false,
        isConnected: true,
        error: null,
      });
    case DISCONNECTED:
      return Object.assign({}, state, {
        isLoading: false,
        isConnected: false,
        error: action.error || 'Unknown error',
      });
  }

  return state;
}

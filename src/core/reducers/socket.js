// @flow
import {
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
} from '../actions/socket';

import type { Action } from '../../store';
import type { Exact } from '../../utils/types';

export type State = Exact<{
  isLoading: boolean,
  isConnected: boolean,
  error: ?string,
}>;

const defaultState = {
  isLoading: false,
  isConnected: false,
  error: null,
};

export default function socketReducer(state: State = defaultState, action: Action): State {
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

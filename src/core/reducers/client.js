// @flow
import {
  FETCH,
  COMPLETE,
  ERROR,
} from '../actions/client';

import type { Action } from '../../store';
import type { Client } from '../types';
import type { Exact } from '../../utils/types';

export type State = Exact<{
  isLoading: boolean,
  client: ?Client,
  error: ?string,
}>;

const defaultState: State = {
  isLoading: false,
  client: null,
  error: null,
};


export default function cwpReducer(state: State = defaultState, action: Action): State {
  switch(action.type) {
    case FETCH:
      return Object.assign({}, state, {isLoading: true, error: null});
    case COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        client: {...action.client},
      });
    case ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        client: null,
        error: action.error,
      });
  }

  return state;
}

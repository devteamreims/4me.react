// @flow
import {
  FETCH,
  COMPLETE,
  ERROR,
} from '../actions/cwp';

import type { Action } from '../../store';
import type { Client } from '../types';
import type { Exact } from '../../utils/types';

export type State = Exact<{
  isLoading: boolean,
  cwp: ?Client,
  error: ?string,
}>;

const defaultState: State = {
  isLoading: false,
  cwp: null,
  error: null,
};


export default function cwpReducer(state: State = defaultState, action: Action): State {
  switch(action.type) {
    case FETCH:
      return Object.assign({}, state, {isLoading: true, error: null});
    case COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        cwp: {...action.cwp},
      });
    case ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        cwp: null,
        error: action.error,
      });
  }

  return state;
}

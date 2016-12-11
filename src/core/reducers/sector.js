// @flow
import {
  FETCH,
  COMPLETE,
  ERROR,
} from '../actions/sector';

import type { Sectors } from '../types';

export type State = {
  isBootstrapped: boolean,
  isLoading: boolean,
  sectors: Sectors,
  error: ?string,
};

import type { Action } from '../../store';

const defaultState: State = {
  isBootstrapped: false,
  isLoading: false,
  sectors: [],
  error: null,
};

export default function cwpReducer(state: State = defaultState, action: Action): State {
  switch(action.type) {
    case FETCH:
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
      });
    case COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        isBootstrapped: true,
        sectors: [...action.sectors],
      });
    case ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        sectors: [],
        error: action.error,
      });
  }

  return state;
}

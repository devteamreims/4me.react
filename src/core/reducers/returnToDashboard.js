// @flow
import {
  RESET_TIMER,
  ENABLE,
  DISABLE,
} from '../actions/returnToDashboard';

import type { Exact } from '../../utils/types';

export type State = Exact<{
  lastUserInteraction: ?number,
  enabled: boolean,
  targetRoute: ?string,
  interval: number,
}>;

const defaultState: State = {
  lastUserInteraction: null,
  enabled: false,
  targetRoute: null,
  interval: 90 * 1000, // 90 seconds
};

import type { Action } from '../../store';

export default function lastUserInteraction(state: State = defaultState, action: Action): State {
  switch(action.type) {
    case RESET_TIMER:
      return {
        lastUserInteraction: Date.now(),
        ...state,
      };
    case ENABLE:
      return {
        enabled: true,
        targetRoute: action.targetRoute || '/',
        lastUserInteraction: Date.now(),
        ...state,
      };
    case DISABLE:
      return Object.assign({}, state, {
        enabled: false,
        lastUserInteraction: null,
      });
  }

  return state;
}

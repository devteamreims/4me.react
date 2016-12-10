// @flow
export const RESET_TIMER = 'core/returnToDashboard/RESET_TIMER';
export const ENABLE = 'core/returnToDashboard/ENABLE';
export const DISABLE = 'core/returnToDashboard/DISABLE';

export type Action =
  | {type: 'core/returnToDashboard/ENABLE', targetRoute: string}
  | {type: 'core/returnToDashboard/RESET_TIMER', when: number}
  | {type: 'core/returnToDashboard/DISABLE'};

import {
  isEnabled,
} from '../selectors/returnToDashboard';

import type {
  ThunkAction,
} from '../../store';

export function interact(): ThunkAction<void> {
  return (dispatch, getState) => {
    if(!isEnabled(getState())) {
      return;
    }

    dispatch(resetTimerAction());
  };
}

export function enable(targetRoute: string = '/'): Action {
  return {
    type: ENABLE,
    targetRoute,
  };
}

export function disable(): Action {
  return {
    type: DISABLE,
  };
}

function resetTimerAction(when = Date.now()): Action {
  return {
    type: RESET_TIMER,
    when,
  };
}

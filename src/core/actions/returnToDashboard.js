export const RESET_TIMER = 'core/returnToDashboard/RESET_TIMER';
export const ENABLE = 'core/returnToDashboard/ENABLE';
export const DISABLE = 'core/returnToDashboard/DISABLE';


import {
  isEnabled,
} from '../selectors/returnToDashboard';

export function interact() {
  return (dispatch, getState) => {
    if(!isEnabled(getState())) {
      return;
    }
    return dispatch(resetTimerAction());
  }
}

export function enable(targetRoute = '/') {
  return {
    type: ENABLE,
    targetRoute,
  };
}

export function disable() {
  return (dispatch, getState) => {
    if(!isEnabled(getState())) {
      return;
    }

    return dispatch({
      type: DISABLE,
    });
  };
}

function resetTimerAction(when = Date.now()) {
  return {
    type: RESET_TIMER,
    when,
  };
}

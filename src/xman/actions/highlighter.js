export const TOGGLE_PENDING_ACTION = 'TOGGLE_PENDING_ACTION';
export const SET_TONE_DOWN = 'SET_TONE_DOWN';
export const CLEAR_TONE_DOWN = 'CLEAR_TONE_DOWN';

export function togglePendingAction() {
  return {
    type: TOGGLE_PENDING_ACTION
  };
}

export function setToneDownFilter(path, value) {
  return {
    type: SET_TONE_DOWN,
    path,
    value
  };
}

export function clearToneDownFilter() {
  return {
    type: CLEAR_TONE_DOWN
  };
}

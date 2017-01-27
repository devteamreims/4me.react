// @flow
export const ADD_REQUEST = 'atfcm/stam/ADD_REQUEST';
export const ADD_SUCCESS = 'atfcm/stam/ADD_SUCCESS';
export const ADD_FAILURE = 'atfcm/stam/ADD_FAILURE';

export const SHOW_ADD_DIALOG = 'atfcm/stam/SHOW_ADD_DIALOG';
export const HIDE_ADD_DIALOG = 'atfcm/stam/HIDE_ADD_DIALOG';

export function commitStam(stam: Object) {
  return {
    type: ADD_REQUEST,
    stam,
  };
}

export function showDialog() {
  return {
    type: SHOW_ADD_DIALOG,
  };
}

export function hideDialog() {
  return {
    type: HIDE_ADD_DIALOG,
  };
}

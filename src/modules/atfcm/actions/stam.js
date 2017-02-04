// @flow
export const ADD_REQUEST = 'atfcm/stam/ADD_REQUEST';
export const ADD_SUCCESS = 'atfcm/stam/ADD_SUCCESS';
export const ADD_FAILURE = 'atfcm/stam/ADD_FAILURE';

export const DEL_REQUEST = 'atfcm/stam/DEL_REQUEST';
export const DEL_SUCCESS = 'atfcm/stam/DEL_SUCCESS';
export const DEL_FAILURE = 'atfcm/stam/DEL_FAILURE';

export const SHOW_ADD_DIALOG = 'atfcm/stam/SHOW_ADD_DIALOG';
export const HIDE_ADD_DIALOG = 'atfcm/stam/HIDE_ADD_DIALOG';

export function commitStam(stam: Object) {
  return {
    type: ADD_REQUEST,
    stam,
  };
}

export function deleteStam(id: *) {
  return {
    type: DEL_REQUEST,
    id,
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

// @flow
export const ADD_REQUEST = 'atfcm/stam/ADD_REQUEST';
export const ADD_SUCCESS = 'atfcm/stam/ADD_SUCCESS';
export const ADD_FAILURE = 'atfcm/stam/ADD_FAILURE';

export const DEL_REQUEST = 'atfcm/stam/DEL_REQUEST';
export const DEL_SUCCESS = 'atfcm/stam/DEL_SUCCESS';
export const DEL_FAILURE = 'atfcm/stam/DEL_FAILURE';

export const SEND_REQUEST = 'atfcm/stam/SEND_REQUEST';
export const SEND_SUCCESS = 'atfcm/stam/SEND_SUCCESS';
export const SEND_FAILURE = 'atfcm/stam/SEND_FAILURE';

export const ARCHIVE_REQUEST = 'atfcm/stam/ARCHIVE_REQUEST';
export const ARCHIVE_SUCCESS = 'atfcm/stam/ARCHIVE_SUCCESS';
export const ARCHIVE_FAILURE = 'atfcm/stam/ARCHIVE_FAILURE';

export const SHOW_ADD_DIALOG = 'atfcm/stam/SHOW_ADD_DIALOG';
export const HIDE_ADD_DIALOG = 'atfcm/stam/HIDE_ADD_DIALOG';
export const TOUCH_ADD_STAM_FORM = 'atfcm/stam/TOUCH_ADD_STAM_FORM';

import moment from 'moment';

import type {
  Stam,
  StamId,
  ValidationError,
} from '../types';

export type Action =
  | {|type: 'atfcm/stam/ADD_REQUEST', stam: Stam|}
  | {|type: 'atfcm/stam/ADD_SUCCESS', stam: Stam|}
  | {|type: 'atfcm/stam/ADD_FAILURE', error: ValidationError|}
  | {|type: 'atfcm/stam/DEL_REQUEST', id: StamId|}
  | {|type: 'atfcm/stam/DEL_SUCCESS', id: StamId|}
  | {|type: 'atfcm/stam/DEL_FAILURE', id: StamId, error: string|}
  | {|type: 'atfcm/stam/SEND_REQUEST', id: StamId, when: ?Date|}
  | {|type: 'atfcm/stam/SEND_SUCCESS', id: StamId, when: ?Date|}
  | {|type: 'atfcm/stam/SEND_FAILURE', id: StamId, error: string|}
  | {|type: 'atfcm/stam/ARCHIVE_REQUEST', id: StamId, when: ?Date|}
  | {|type: 'atfcm/stam/ARCHIVE_SUCCESS', id: StamId, when: ?Date|}
  | {|type: 'atfcm/stam/ARCHIVE_FAILURE', id: StamId, error: string|}
  | {|type: 'atfcm/stam/SHOW_ADD_DIALOG'|}
  | {|type: 'atfcm/stam/HIDE_ADD_DIALOG'|}
  | {|type: 'atfcm/stam/TOUCH_ADD_STAM_FORM'|}

export function commitStam(stam: Stam): Action {
  return {
    type: ADD_REQUEST,
    stam,
  };
}

type CommitStamError =
  | string
  | Error
  | {message: string, fields?: {[key: string]: ?string}};

export function commitStamError(error: CommitStamError): Action {
  let message = 'Unknown error';
  let fields = null;

  if(typeof error === 'string') {
    message = error;
  }

  if(error.message) {
    message = error.message;
  }

  if(error.fields) {
    fields = error.fields;
  }

  return {
    type: ADD_FAILURE,
    error: {
      message,
      fields,
    },
  };
}

export function deleteStam(id: StamId): Action {
  return {
    type: DEL_REQUEST,
    id,
  };
}

export function sendStam({id, delay}: {id: string, delay: ?number}): Action {
  const when = typeof delay === 'number' ? moment().add(delay, 'seconds').toDate() : null;

  return {
    type: SEND_REQUEST,
    id,
    when,
  };
}

export function archiveStam({id, delay}: {id: string, delay: ?number}): Action {
  const when = typeof delay === 'number' ? moment().add(delay, 'seconds').toDate() : null;

  return {
    type: ARCHIVE_REQUEST,
    id,
    when,
  };
}

export function showDialog(): Action {
  return {
    type: SHOW_ADD_DIALOG,
  };
}

export function hideDialog(): Action {
  return {
    type: HIDE_ADD_DIALOG,
  };
}

export function touchForm(): Action {
  return {
    type: TOUCH_ADD_STAM_FORM,
  };
}

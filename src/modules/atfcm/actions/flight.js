// @flow
export const DEL_REQUEST = 'atfcm/flight/DEL_REQUEST';
export const DEL_SUCCESS = 'atfcm/flight/DEL_SUCCESS';
export const DEL_FAILURE = 'atfcm/flight/DEL_FAILURE';

export const ADD_REQUEST = 'atfcm/flight/ADD_REQUEST';
export const ADD_SUCCESS = 'atfcm/flight/ADD_SUCCESS';
export const ADD_FAILURE = 'atfcm/flight/ADD_FAILURE';

export const SHOW_FORM = 'atfcm/flight/SHOW_FORM';
export const HIDE_FORM = 'atfcm/flight/HIDE_FORM';
export const TOUCH_FORM = 'atfcm/flight/TOUCH_FORM';

export const REMOVE_ORPHANS = 'atfcm/flight/REMOVE_ORPHANS';

export function deleteFlight(id: *) {
  return {
    type: DEL_REQUEST,
    id,
  };
}

export function removeOrphanFlights(ids: Array<*>) {
  return {
    type: REMOVE_ORPHANS,
    ids,
  };
}

export function showForm(stam: *, flight: *) {
  if(!stam || !stam.id) {
    return;
  }

  return {
    type: SHOW_FORM,
    stamId: stam.id,
    flightId: (flight && flight.id) ? flight.id : null,
  };
}

type CommitFlightError =
  | string
  | Error
  | {message: string, fields?: {[key: string]: ?string}};

export function commitFlightError(error: CommitFlightError) {
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

export function commitFlight(stamId: *, flight: *) {
  if(!stamId || !flight) {
    return;
  }

  return {
    type: ADD_REQUEST,
    stamId,
    flight,
  };
}

export function hideDialog() {
  return {
    type: HIDE_FORM,
  };
}

export function touchForm() {
  return {
    type: TOUCH_FORM,
  };
}

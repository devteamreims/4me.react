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

export const HIDE = 'atfcm/flight/HIDE';
export const UNHIDE = 'atfcm/flight/UNHIDE';

import type {
  StamId,
  Stam,
  FlightId,
  Flight,
  ValidationError,
} from '../types';

export type Action =
  | {|type: 'atfcm/flight/DEL_REQUEST', id: FlightId|}
  | {|type: 'atfcm/flight/DEL_SUCCESS', id: FlightId|}
  | {|type: 'atfcm/flight/DEL_FAILURE', id: FlightId, error: ValidationError|}
  | {|type: 'atfcm/flight/ADD_REQUEST', stamId: StamId, flight: Flight|}
  | {|type: 'atfcm/flight/ADD_SUCCESS', stamId: StamId, flight: Flight|}
  | {|type: 'atfcm/flight/ADD_FAILURE', error: ValidationError|}
  | {|type: 'atfcm/flight/SHOW_FORM', stamId: StamId, flightId: ?FlightId|}
  | {|type: 'atfcm/flight/HIDE_FORM'|}
  | {|type: 'atfcm/flight/TOUCH_FORM'|}
  | {|type: 'atfcm/flight/REMOVE_ORPHANS', ids: Array<FlightId>|}
  | {|type: 'atfcm/flight/HIDE', id: FlightId|}
  | {|type: 'atfcm/flight/UNHIDE', id: FlightId|}

export function deleteFlight(id: FlightId): Action {
  return {
    type: DEL_REQUEST,
    id,
  };
}

export function removeOrphanFlights(ids: Array<FlightId>): Action {
  return {
    type: REMOVE_ORPHANS,
    ids,
  };
}

export function showForm(stam: Stam, flight: ?Flight): Action {
  if(!stam || !stam.id) {
    throw new Error('atfcm/actions/flight/showForm: Stam is not a valid stam !');
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

export function commitFlightError(error: CommitFlightError): Action {
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

export function commitFlight(stamId: mixed, flight: mixed): Action {
  if(!stamId || !flight) {
    throw new Error('atfcm/actions/flight: Invalid arguments (stamId, flight)', stamId, flight);
  }

  return {
    type: ADD_REQUEST,
    stamId,
    flight,
  };
}

export function hideDialog(): Action {
  return {
    type: HIDE_FORM,
  };
}

export function touchForm(): Action {
  return {
    type: TOUCH_FORM,
  };
}

export function hideFlight(flight: Flight): Action {
  return {
    type: HIDE,
    id: flight.id,
  };
}

export function unhideFlight(flight: Flight): Action {
  return {
    type: UNHIDE,
    id: flight.id,
  };
}

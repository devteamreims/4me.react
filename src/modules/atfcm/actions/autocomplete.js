// @flow
export const AUTOCOMPLETE_REQUEST = 'atfcm/flight/AUTOCOMPLETE_REQUEST';
export const AUTOCOMPLETE_SUCCESS = 'atfcm/flight/AUTOCOMPLETE_SUCCESS';
export const AUTOCOMPLETE_FAILURE = 'atfcm/flight/AUTOCOMPLETE_FAILURE';


export function request() {
  return {
    type: AUTOCOMPLETE_REQUEST,
  };
}

export function error(err: string) {
  const error = err.message || err || 'Unknown error';
  return {
    type: AUTOCOMPLETE_FAILURE,
    error,
  };
}

export function complete(flights: Array<string>) {
  return {
    type: AUTOCOMPLETE_SUCCESS,
    flights,
  };
}

// @flow
export const DEL_REQUEST = 'atfcm/flight/DEL_REQUEST';
export const DEL_SUCCESS = 'atfcm/flight/DEL_SUCCESS';
export const DEL_FAILURE = 'atfcm/flight/DEL_FAILURE';

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

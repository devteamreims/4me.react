import axios from 'axios';

import api from '../../api';

export const FETCH = 'mapping/suggest/FETCH';
export const FAIL = 'mapping/suggest/FAIL';
export const COMPLETE = 'mapping/suggest/COMPLETE';


export function fetchSuggestions(cwpId) {
  return (dispatch, getState) => {
    // Check if loading
    let isLoading = false;

    // Here we should abort current request and restart one
    // This is not currently implemented in axios
    // See here : https://github.com/mzabriskie/axios/issues/50

    // Current workaround is to let first request fly and to just resend one
    /*
    if(isLoading) {
      console.log('Already loading !!');
      return;
    }
    */

    dispatch(start(cwpId));

    const apiUrl = api.mapping.map.suggest(cwpId);

    console.log(`Loading suggestion for cwp ${cwpId} from backend`);

    return axios.get(apiUrl)
      .then((response) => {
        return dispatch(complete(cwpId, response.data));
      })
      .catch((error) => {
        return dispatch(fail(cwpId, error));
      });


  };
}

export function fail(cwpId, rawError) {
  const error = rawError.message || rawError.statusText || 'Unknown error';
  return {
    type: FAIL,
    cwpId,
    error,
  };
}

export function start(cwpId) {
  return {
    type: FETCH,
    cwpId,
  };
}


export function complete(cwpId, suggestions = []) {
  return {
    type: COMPLETE,
    cwpId,
    suggestions,
  };
}

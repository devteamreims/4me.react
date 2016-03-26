/*import {
  isLoading as isCwpLoading
} from '../selectors/cwp';
*/

import axios from 'axios';

import api from '../../api';

export const FETCH = 'mapping/cwp/FETCH';
export const ERROR = 'mapping/cwp/ERROR';
export const COMPLETE = 'mapping/cwp/COMPLETE';

// Refresh CWPs
// Uses redux thunk
export function refreshCwps() {
  return (dispatch, getState) => {
    // Check if loading
    //let isLoading = isCwpLoading(getState());

    const isLoading = true;

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

    dispatch(start());

    const apiUrl = api.mapping.cwp.getAll;

    console.log('Loading CWPs from backend');

    return axios.get(apiUrl)
      .then((response) => {
        return dispatch(complete(response.data));
      })
      .catch((error) => {
        return dispatch(fail(error));
      });
  }
}

export function fail(rawError) {
  const error = rawError.message || rawError.statusText || 'Unknown error';
  return {
    type: ERROR,
    error
  };
}

export function start() {
  return {
    type: FETCH
  };
}


export function complete(cwps = []) {
  return {
    type: COMPLETE,
    cwps
  };
}

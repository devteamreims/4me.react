export const FETCH = 'core/cwp/FETCH';
export const COMPLETE = 'core/cwp/COMPLETE';
export const ERROR = 'core/cwp/ERROR';

import axios from 'axios';
import _ from 'lodash';

import api from '../../api';

export function fetchCwp() {
  return (dispatch, getState) => {
    dispatch(fetchAction());

    return axios.get(api.core.mapping.cwp.getMine)
      .then((response) => {
        console.log('This should not appear');
        const cwp = _.pick(response.data, ['id', 'name', 'disabled', 'type']);
        return dispatch(completeAction(cwp));
      })
      .catch((error) => {
        dispatch(errorAction(error.message));
        return Promise.reject(error);
      });
  };
};


function completeAction(cwp) {
  return {
    type: COMPLETE,
    cwp,
  };
}

function fetchAction() {
  return {
    type: FETCH,
  };
}

function errorAction(error) {
  return {
    type: ERROR,
    error,
  };
}

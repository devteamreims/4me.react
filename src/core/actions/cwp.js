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
        const cwp = _.pick(response.data, ['id', 'name', 'disabled', 'type']);
        return dispatch(completeAction(cwp));
      })
      .catch((response) => dispatch(errorAction(response)));
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

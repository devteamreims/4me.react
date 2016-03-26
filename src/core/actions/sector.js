export const FETCH = 'core/sector/FETCH';
export const COMPLETE = 'core/sector/COMPLETE';
export const ERROR = 'core/sector/ERROR';

import axios from 'axios';
import _ from 'lodash';

import api from '../../api';
import { getCwpId } from '../selectors/cwp';

export function fetchSectors(isBootstrapping = false) {
  return (dispatch, getState) => {
    dispatch(fetchAction(isBootstrapping));
    const myCwpId = getCwpId(getState());
    const url = api.core.mapping.sectors.getMine(myCwpId);

    return axios.get(url)
      .then((response) => {
        const sectors = _.get(response.data, 'sectors', []);
        return dispatch(completeAction(sectors));
      })
      .catch((error) => {
        dispatch(errorAction(error.message));
        return Promise.reject(error);
      });
  };
};

export function bindNewSectors(sectors = []) {
  return (dispatch, getState) => {
    // TODO: Trigger onChange in organs
    return dispatch(completeAction(sectors));
  };
};


function completeAction(sectors) {
  return {
    type: COMPLETE,
    sectors,
  };
}

function fetchAction(isBootstrapping = false) {
  return {
    type: FETCH,
    isBootstrapping,
  };
}

function errorAction(error) {
  return {
    type: ERROR,
    error,
  };
}

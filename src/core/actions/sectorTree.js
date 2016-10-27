export const FETCH = 'core/sectorTree/FETCH';
export const COMPLETE = 'core/sectorTree/COMPLETE';
export const ERROR = 'core/sectorTree/ERROR';

import _ from 'lodash';
import axios from 'axios';

import api from '../../api';

export function fetchSectorTree() {
  return (dispatch) => {
    dispatch(fetchAction());

    return axios.get(api.core.mapping.sectors.getTree)
      .then((response) => {
        const tree = _.map(response.data,
          (s) => _.pick(s, ['name', 'elementarySectors'])
        );
        return dispatch(completeAction(tree));
      })
      .catch((error) => {
        dispatch(errorAction(error.message));
        return Promise.reject(error);
      });
  };
}

function completeAction(sectorTree) {
  return {
    type: COMPLETE,
    sectorTree,
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

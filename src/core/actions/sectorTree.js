export const FETCH = 'core/sectorTree/FETCH';
export const COMPLETE = 'core/sectorTree/COMPLETE';
export const ERROR = 'core/sectorTree/ERROR';

const tree = [{
  name: 'UXR',
  elementarySectors: ['UR', 'XR'],
}, {
  name: 'KHR',
  elementarySectors: ['KR', 'YR', 'HR'],
}];

import _ from 'lodash';
import axios from 'axios';

import api from '../../api';

export function fetchSectorTree() {
  return (dispatch, getState) => {
    dispatch(fetchAction());

    return axios.get(api.core.mapping.sectors.getTree)
      .then((response) => {
        const tree = _.map(response.data,
          (s) => _.pick(s, ['name', 'elementarySectors'])
        );
        return dispatch(completeAction(tree));
      })
      .catch((response) => dispatch(errorAction(response)));
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

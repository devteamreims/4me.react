import _ from 'lodash';
import pick from 'lodash/fp/pick';

import api from '../../api';
import axios from 'axios';

export const SET_FETCHER_SERVICES_STATUS = 'xman/backend-status/SET_FETCHER_SERVICES_STATUS';
export const SET_POSITION_SERVICE_STATUS = 'xman/backend-status/SET_POSITION_SERVICE_STATUS';


export function fetchStatus() {
  // HTTP Request to fetch status
  return (dispatch, getState) => {

    const apiUrl = api.xman.status.getAll;

    return axios.get(apiUrl)
      .then((response) => {
        return dispatch(setStatus(response.data));
      })
      .catch((error) => {
        // Set status to errored
        dispatch(setFetcherServicesAction({}));
        dispatch(setPositionServiceAction({
          status: 'error',
          lastUpdated: Date.now(),
        }));
      });
  };
}

export function setStatus(status) {
  // After having a backendStatus object (socket or http)
  return (dispatch, getState) => {
    const {positions, fetchers} = _.get(status, 'items');

    if(!positions || !fetchers) {
      console.err('xman/backendStatus/setStatus : Got improper data from backend');
      return;
    }

    dispatch(setFetcherServicesAction(fetchers));
    dispatch(setPositionServiceAction(positions));
  };
}


function setFetcherServicesAction(fetchers) {
  return {
    type: SET_FETCHER_SERVICES_STATUS,
    payload: _.mapValues(fetchers, pick(['status', 'lastUpdated', 'forceMcs', 'forceOff', 'error'])),
  };
}

function setPositionServiceAction(positions) {
  return {
    type: SET_POSITION_SERVICE_STATUS,
    payload: pick(['status', 'lastUpdated', 'error'], positions),
  };
}

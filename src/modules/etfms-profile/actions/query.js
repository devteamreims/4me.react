export const START = 'arcid/query/START';
export const COMPLETE = 'arcid/query/COMPLETE';
export const ERROR = 'arcid/query/ERROR';
export const CLEAR_RESULTS = 'arcid/query/CLEAR_RESULTS';

import _ from 'lodash';

import axios from 'axios';
import api from '../api';

import {
  isLoading,
  hasMultipleResults,
  hasNoResults,
  getFlights,
} from '../selectors/query';

/*
import {
  getProfile,
} from './profile';
*/

export function startQuery(callsign) {
  return (dispatch, getState) => {
    if(_.isEmpty(callsign)) {
      return;
    }

    if(isLoading(getState())) {
      console.log('arcid/query/startQuery : A query is already in progress ...');
      return;
    }

    // Inform our store that we are starting a callsign query
    dispatch(startAction(callsign));

    const apiUrl = api.searchCallsign;
    const reqParams = {
      callsign,
    };

    return axios.get(apiUrl, {params: reqParams, timeout: 15000})
      .then(resp => {
        const results = resp.data;

        return dispatch(completeAction(results));
      })
      .then(() => {
        // Check state, if only 1 result, dispatch getProfile
        if(hasMultipleResults(getState()) || hasNoResults(getState())) {
          return;
        }

        const flight = _.head(getFlights(getState()));
        const ifplId = _.get(flight, 'ifplId', null);
        if(!ifplId) {
          return;
        }

        console.log(`Single result for ${ifplId}, fetching profile !`);
        // return dispatch(getProfile(flight));
      })
      .catch(err => dispatch(errorAction('An error occured contacting arcid backend', err)));
  };
}

export function clearQuery() {
  return clearAction();
}

export function clearAction() {
  return {
    type: CLEAR_RESULTS,
  };
}

function startAction(callsign) {
  return {
    type: START,
    callsign,
  };
}

function errorAction(error, rawError = {}) {
  return {
    type: ERROR,
    error,
    rawError,
  };
}

function completeAction(flights) {
  return {
    type: COMPLETE,
    flights,
  };
}

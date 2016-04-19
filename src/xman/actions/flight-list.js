import _ from 'lodash';

export const REFRESH = 'xman/flightList/REFRESH';
export const COMPLETE = 'xman/flightList/COMPLETE';
export const FAIL = 'xman/flightList/FAIL';

export const CLEAR = 'xman/flightList/CLEAR';
export const UPDATE_FLIGHT = 'xman/flightList/UPDATE_FLIGHT';

import api from '../../api';
import axios from 'axios';

import {
  setSubscriptionFilter,
} from '../socket';

import {
  getVerticalFilter,
  getGeographicalFilter,
} from '../selectors/list-filter';

import {
  getQueryParams,
  getKnownFlightIds,
  getFlightByIfplId,
} from '../selectors/flight-list';

// Refresh the full xman flight list
// Uses redux thunk
export function refreshFullList() {
  return (dispatch, getState) => {
    // Check if loading
    //let isLoading = getState().flightList.isLoading;

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

    const apiUrl = api.xman.xman.getAll;

    const queryParams = getQueryParams(getState());

    console.log('Loading XMAN flights with these params :');
    console.log(queryParams);

    return axios.get(apiUrl, {
      params: queryParams
    }).then((response) => {
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
    type: FAIL,
    error,
  };
}

export function start() {
  return {
    type: REFRESH,
  };
}

export function clear() {
  return {
    type: CLEAR,
  };
}

function preprocessFlight(rawFlight) {
  const ifplId = _.get(rawFlight, 'flightId');
  const position = _.get(rawFlight, 'position');

  // Round currentFlightLevel here

  if(position.vertical.currentFlightLevel % 10 > 7 || position.vertical.currentFlightLevel % 10 < 3) {
    Object.assign(position.vertical, {
      currentFlightLevel: Math.round(position.vertical.currentFlightLevel/10)*10,
    });
  }

  return {
    ifplId,
    position,
    ...rawFlight,
  };
}


export function complete(rawFlights = []) {
  const flights = _.map(rawFlights, preprocessFlight);
  return {
    type: COMPLETE,
    flights,
  };
}


export function updateFlightAction(flight = {}) {
  return {
    type: UPDATE_FLIGHT,
    flight,
  };
}

export function updateFlight(unprocessedFlight) {
  return (dispatch, getState) => {
    console.log('XMAN updateFlight : unprocessedFlight is :');
    console.log(unprocessedFlight);

    if(_.isEmpty(unprocessedFlight)) {
      console.log('XMAN : updateFlight : Empty data provided !');
      return;
    }

    const flight = preprocessFlight(unprocessedFlight);

    const ifplId = _.get(flight, 'ifplId', null);

    const knownFlight = getFlightByIfplId(getState(), ifplId);

    const isKnown = !_.isEmpty(knownFlight);

    if(!isKnown) {
      console.log(`XMAN : updateFlight : Unknown flight id : ${ifplId}`);
      return;
    }


    return dispatch(updateFlightAction(flight));
  };
}

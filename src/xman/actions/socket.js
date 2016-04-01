import {
  refreshFullList
} from './flight-list';

export const CONNECTED = 'xman/socket/CONNECTED';
export const DISCONNECTED = 'xman/socket/DISCONNECTED';

import {
  getQueryParams,
} from '../selectors/flight-list';

import {
  setSubscriptionFilter,
} from '../socket';

export function socketConnected() {
  return (dispatch, getState) => {

    const queryParams = getQueryParams(getState());

    // Update socket subscription
    setSubscriptionFilter(queryParams);

    return dispatch(socketConnectedAction());
  };
}

export function socketDisconnected() {
  return (dispatch, getState) => {
    return dispatch(socketDisconnectAction());
  };
}

function socketDisconnectAction() {
  return {
    type: DISCONNECTED
  };
}

function socketConnectedAction() {
  return {
    type: CONNECTED
  };
}

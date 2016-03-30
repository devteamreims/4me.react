import {
  refreshFullList
} from './flight-list';

export const CONNECTED = 'xman/socket/CONNECTED';
export const DISCONNECTED = 'xman/socket/DISCONNECTED';

export function socketConnected() {
  return (dispatch, getState) => {
    return dispatch(refreshFullList())
      .then(() => dispatch(socketConnectedAction()))
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

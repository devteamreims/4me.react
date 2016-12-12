export const CONNECTED = 'arcid/socket/CONNECTED';
export const DISCONNECTED = 'arcid/socket/DISCONNECTED';

import { refreshHistory } from './history';

export function socketConnected() {
  return (dispatch) => {
    return Promise.all([
      dispatch(socketConnectedAction()),
      dispatch(refreshHistory())
    ]);
  };
}

export function socketDisconnected() {
  return (dispatch) => {
    return dispatch(socketDisconnectAction());
  };
}

function socketDisconnectAction() {
  return {
    type: DISCONNECTED,
  };
}

function socketConnectedAction() {
  return {
    type: CONNECTED,
  };
}

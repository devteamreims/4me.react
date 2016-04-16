export const CONNECTED = 'mapping/socket/CONNECTED';
export const DISCONNECTED = 'mapping/socket/DISCONNECTED';

export function socketConnected() {
  return (dispatch, getState) => {
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
    type: DISCONNECTED,
  };
}

function socketConnectedAction() {
  return {
    type: CONNECTED,
  };
}

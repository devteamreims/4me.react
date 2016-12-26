import {
  socketConnected,
  socketDisconnected
} from '../actions/socket';

let mySocket;

// Global socketIo object event handler
export function setupSocketIo(dispatch, socketIo) {
  console.log('Initializing socket.io');

  mySocket = socketIo;

  socketIo.on('connect', (socket) => { // eslint-disable-line no-unused-vars
    console.log('arcid/socket: Connected to server !');
    dispatch(socketConnected());
  });

  socketIo.on('disconnect', (socket) => dispatch(socketDisconnected())); // eslint-disable-line no-unused-vars

  attachHandlerToSocket(dispatch, socketIo);

  return mySocket;
}


export function getSocket() {
  return mySocket;
}


export function disconnect() {
  if(!mySocket) {
    return;
  }

  mySocket.disconnect();
  mySocket = undefined;
}

import {
  setHistory,
} from '../actions/history';

export function attachHandlerToSocket(dispatch, socket) {
  socket.on('update_history', (data) => {
    console.log('UPDATE_FLIGHTS');
    console.log(data);

    dispatch(setHistory(data));
  });
}

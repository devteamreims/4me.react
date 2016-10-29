import {
  socketConnected,
  socketDisconnected,
} from '../actions/socket';

let mySocket;

// Global socketIo object event handler
export function setupSocketIo(dispatch, socketIo) {
  console.log('Initializing socket.io');

  mySocket = socketIo;

  socketIo.on('connect', (socket) => { // eslint-disable-line no-unused-vars
    console.log('Connected to server !');
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
  complete as setMap,
} from '../actions/map';

export function attachHandlerToSocket(dispatch, socket) {
  socket.on('map_updated', (data) => {
    console.log('MAPPING Socket: map_updated');
    console.log(data);

    dispatch(setMap(data));
  });
}

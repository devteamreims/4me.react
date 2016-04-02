import {
  socketConnected,
  socketDisconnected
} from '../actions/socket';

let mySocket;

// Global socketIo object event handler
export function setupSocketIo(dispatch, socketIo) {
  console.log('Initializing socket.io');

  mySocket = socketIo;

  socketIo.on('connect', function(socket) {
    console.log('Connected to server !');
    dispatch(socketConnected());
  });

  socketIo.on('disconnect', (socket) => dispatch(socketDisconnected()));

  attachHandlerToSocket(dispatch, socketIo);

  return mySocket;
}


export function getSocket() {
  return mySocket;
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


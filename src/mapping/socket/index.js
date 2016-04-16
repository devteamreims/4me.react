import {
  socketConnected,
  socketDisconnected,
} from '../actions/socket';

import _ from 'lodash';

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
  complete as setMap,
} from '../actions/map';

export function attachHandlerToSocket(dispatch, socket) {

  socket.on('map_updated', (data) => {
    console.log('MAPPING Socket: map_updated');
    console.log(data);

    dispatch(setMap(data));
  });


}

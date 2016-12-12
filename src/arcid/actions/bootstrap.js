import io from 'socket.io-client';

import api from '../../api';

import {
  setupSocketIo,
  getSocket,
  disconnect,
} from '../socket';

export function bootstrap() {
  return (dispatch) => {
    console.log('Bootstrapping ARCID !!');

    // Only setup a new socket if we don't have one
    const setupSocket = () => {
      if(getSocket()) {
        console.log('arcid/bootstrap: Bootstrapping arcid while already having a socket.');
        return;
      }

      const socketIo = io.connect(api.arcid.socket);

      return setupSocketIo(dispatch, socketIo);
    };


    // History will be refreshed when our socket connects
    return setupSocket();
  };
}

export function cleanUp() {
  return () => {
    disconnect();
  };
}

import { refreshCwps } from './cwp';
import { refreshMap } from './map';

import io from 'socket.io-client';
import api from '../../api';

import {
  setupSocketIo,
  getSocket,
  disconnect,
} from '../socket';

export function bootstrap() {
  return (dispatch) => {
    console.log('Bootstrapping MAPPING !!');
    // Fetch CWPs and fetch map

    const setupSocket = () => {
      if(getSocket()) {
        console.log('mapping/bootstrap: Bootstrapping mapping while already having a socket.');
        return;
      }

      const socketIo = io.connect(api.mapping.socket);

      return setupSocketIo(dispatch, socketIo);
    };

    return Promise.all([
      dispatch(refreshMap()),
      dispatch(refreshCwps()),
      setupSocket(),
    ]);
  };
}

export function cleanUp() {
  return () => {
    console.log('Cleaning up MAPPING');

    disconnect();
  };
}

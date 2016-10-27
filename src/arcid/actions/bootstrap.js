import io from 'socket.io-client';

import api from '../../api';

import {
  setupSocketIo,
  getSocket,
} from '../socket';

import {
  refreshHistory,
} from './history';

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


    // Refresh history

    return Promise.all([
      setupSocket(),
      dispatch(refreshHistory()),
    ]);
  };
}

export function onSectorChange() {
  console.log('Dispatching arcid on sector change');
  return;
}

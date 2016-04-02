import io from 'socket.io-client';

import api from '../../api';

import { setupSocketIo } from '../socket';

import {
  refreshHistory,
} from './history';

export function bootstrap() {
  return (dispatch, getState) => {
    console.log('Bootstrapping ARCID !!');

    // Connect to socket, set handlers
    const socketIo = io.connect(api.arcid.socket);

    // Refresh history

    return Promise.all([
      setupSocketIo(dispatch, socketIo),
      dispatch(refreshHistory()),
    ]);
  };
}

export function onSectorChange() {
  return (dispatch, getState) => {
    console.log('Dispatching arcid on sector change');
    return;
  };
}

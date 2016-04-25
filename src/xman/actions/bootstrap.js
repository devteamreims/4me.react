import {refreshFullList} from './flight-list';
import { fetchStatus } from './backend-status';

import io from 'socket.io-client';
import api from '../../api';

import { setupSocketIo } from '../socket';

export function bootstrap() {
  return (dispatch, getState) => {
    console.log('Bootstrapping XMAN !!');

    const socketIo = io.connect(api.xman.socket);

    // Refresh flight list,
    // Connect to socket, set handlers

    return Promise.all([
      dispatch(fetchStatus()),
      dispatch(refreshFullList()),
      setupSocketIo(dispatch, socketIo),
    ]);
  };
}

export function onSectorChange() {
  return (dispatch, getState) => {
    console.log('Dispatching xman on sector change');
    return Promise.all([
      dispatch(refreshFullList()),
    ]);
  };
}

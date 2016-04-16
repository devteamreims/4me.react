import { refreshCwps } from './cwp';
import { refreshMap } from './map';

import io from 'socket.io-client';
import api from '../../api';

import { setupSocketIo } from '../socket';

export function bootstrap() {
  return (dispatch, getState) => {
    console.log('Bootstrapping MAPPING !!');
    // Fetch CWPs and fetch map

    const socketIo = io.connect(api.mapping.socket);

    return Promise.all([
      dispatch(refreshMap()),
      dispatch(refreshCwps()),
      setupSocketIo(dispatch, socketIo),
    ]);
  };
}

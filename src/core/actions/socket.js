export const CONNECTING = 'core/socket/CONNECTING';
export const CONNECTED = 'core/socket/CONNECTED';
export const DISCONNECTED = 'core/socket/DISCONNECTED';

import io from 'socket.io-client';
import api from '../../api';

import {
  getCwpId,
} from '../selectors/cwp';

import {
  getSectors,
} from '../selectors/sector';

import {
  fetchSectors,
  bindNewSectors,
} from './sector';

let mySocket;

import {
  startBootstrap,
} from './bootstrap';

export function connectSocket() {
  return (dispatch, getState) => {
    console.log('Connecting socket !');

    if(mySocket) {
      console.log('core/socket: trying to connectSocket when socket is already connected');
      return;
    }

    dispatch(socketConnecting());
    const socketUrl = api.core.socket;
    const cwpId = getCwpId(getState());

    mySocket = io.connect(socketUrl, {query: `cwp-id=${cwpId}`});

    mySocket.on('connect', (socket) => { // eslint-disable-line no-unused-vars
      console.log('core/socket: Socket connected');
      return dispatch(socketConnected());
    });

    mySocket.on('reconnect', (socket) => { // eslint-disable-line no-unused-vars
      console.log('core/socket: Socket reconnected !');
      // On reconnect, rebootstrap the app
      // This is needed to clear our current state and refetch proper information (sectors & everything)
      return dispatch(startBootstrap());
    });

    mySocket.on('disconnect', () => {
      // mySocket = undefined;
      console.log('Socket disconnected ...');
      return dispatch(socketDisconnected());
    });

    mySocket.on('mapping:refresh', (data) => {
      console.log('core/socket: Got refresh signal from mapping backend');
      console.log(data);

      const oldSectors = getSectors(getState());

      return dispatch(fetchSectors())
        .then((data) => {
          const { sectors } = data;
          return dispatch(bindNewSectors(oldSectors, sectors));
        });
    });

    mySocket.on('force_reload', () => { // eslint-disable-line no-unused-vars
      console.log('core/socket: Reloading app');
      window.location.reload(true);
    });


    return mySocket;
  };
}


function socketConnecting() {
  return {
    type: CONNECTING,
  };
}

function socketConnected() {
  return {
    type: CONNECTED,
  };
}

function socketDisconnected(error) {
  return {
    type: DISCONNECTED,
    error,
  };
}

export const CONNECTING = 'core/socket/CONNECTING';
export const CONNECTED = 'core/socket/CONNECTED';
export const DISCONNECTED = 'core/socket/DISCONNECTED';

import io from 'socket.io-client';
import api from '../../api';

import {
  getCwpId,
} from '../selectors/cwp';

import {
  fetchSectors,
} from './sector';

let mySocket;

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

    mySocket.on('connect', (socket) => {
      console.log('Socket connected');
      return dispatch(socketConnected());
    });

    mySocket.on('disconnect', () => {
      mySocket = undefined;
      console.log('Socket disconnected ...');
      return dispatch(socketDisconnected());
    });

    mySocket.on('mapping:refresh', (data) => {
      console.log('core/socket: Got refresh signal from mapping backend');
      console.log(data);
      return dispatch(fetchSectors());
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

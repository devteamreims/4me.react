// @flow
export const CONNECTED = 'mapping/socket/CONNECTED';
export const DISCONNECTED = 'mapping/socket/DISCONNECTED';

export type Action =
  | {type: 'mapping/socket/CONNECTED'}
  | {type: 'mapping/socket/DISCONNECTED'}

import type {
  ThunkAction,
} from '../../store';


import io from 'socket.io-client';
import api from '../../api';

import {
  complete as setMap,
  refreshMap,
} from './map';

let mySocket;

export function connectSocket(): ThunkAction<*> {
  return (dispatch) => {
    console.log('mapping/socket: Connecting ...');
    if(mySocket) {
      console.log('mapping/socket: trying to connectSocket when socket is already connected');
      return;
    }

    mySocket = io.connect(api.mapping.socket);

    mySocket.on('connect', (socket) => { // eslint-disable-line no-unused-vars
      console.log('mapping/socket: Socket connected');
      return dispatch(socketConnected());
    });

    mySocket.on('reconnect', (socket) => { // eslint-disable-line no-unused-vars
      console.log('mapping/socket: Socket reconnected !');
      // On reconnect, refetch the latest map from the backend
      return dispatch(refreshMap());
    });

    mySocket.on('disconnect', () => {
      // mySocket = undefined;
      console.log('Socket disconnected ...');
      return dispatch(socketDisconnected());
    });

    mySocket.on('map_updated', (data) => {
      dispatch(setMap(data));
    });

    return mySocket;
  };
}

export function disconnectSocket(): ThunkAction<void> {
  return () => {
    if(!mySocket) {
      return;
    }

    console.log('mapping/socket: Force disconnect !');
    mySocket.disconnect();
    mySocket = undefined;
  };
}


export function socketConnected() {
  return {
    type: CONNECTED,
  };
}

export function socketDisconnected() {
  return {
    type: DISCONNECTED,
  };
}

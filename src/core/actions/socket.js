// @flow
export const CONNECTING = 'core/socket/CONNECTING';
export const CONNECTED = 'core/socket/CONNECTED';
export const DISCONNECTED = 'core/socket/DISCONNECTED';

export type Action =
  | {type: 'core/socket/CONNECTING'}
  | {type: 'core/socket/CONNECTED'}
  | {type: 'core/socket/DISCONNECTED', error: string}
;

import type {
  ThunkAction,
} from '../../store';


import io from 'socket.io-client';
import api from '../../api';

import {
  getClientId,
} from '../selectors/client';

import {
  fetchSectors,
} from './sector';

import {
  startBootstrap,
} from './bootstrap';

let mySocket;
export function connectSocket(): ThunkAction<*> {
  return (dispatch, getState) => {
    console.log('core/socket: Connecting ...');

    if(mySocket) {
      console.log('core/socket: trying to connectSocket when socket is already connected');
      return;
    }

    dispatch(socketConnecting());
    const socketUrl = api.core.socket;
    const clientId = getClientId(getState());

    if(!clientId) {
      throw new Error('Cannot connect to socket without knowing our ClientId !');
    }

    mySocket = io.connect(socketUrl, {query: `client-id=${clientId}`});

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

    mySocket.on('clients_changed', clientIds => {
      console.log('core/socket: clients_changed', clientIds);
      // Backend will notify everyone that something happened
      // Backend will include ids of clients whose sectors have been updated
      if(clientIds.includes(clientId)) {
        dispatch(fetchSectors());
      }
    });

    mySocket.on('force_reload', () => {
      console.log('core/socket: Reloading app');
      window.location.reload(true);
    });


    return mySocket;
  };
}

export function disconnectSocket(): ThunkAction<void> {
  return () => {
    if(!mySocket) {
      return;
    }

    mySocket.disconnect();

    mySocket = undefined;
  };
}

function socketConnecting(): Action {
  return {
    type: CONNECTING,
  };
}

function socketConnected(): Action {
  return {
    type: CONNECTED,
  };
}

function socketDisconnected(error: string = 'Unknown error'): Action {
  return {
    type: DISCONNECTED,
    error,
  };
}

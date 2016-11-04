import _ from 'lodash';

import { fetchStatus } from './backend-status';

import io from 'socket.io-client';
import api from '../../api';

import {
  setupSocketIo,
  getSocket,
  disconnect,
} from '../socket';

import {
  setFilter,
} from './list-filter';

export function bootstrap(sectors = []) {
  return (dispatch) => {
    console.log('Bootstrapping XMAN !!');

    // Only setup a new socket if we don't have one
    const setupSocket = () => {
      if(getSocket()) {
        console.log('xman/bootstrap: Bootstrapping xman while already having a socket.');
        return;
      }

      const socketIo = io.connect(api.xman.socket);

      return setupSocketIo(dispatch, socketIo);
    };

    // Refresh flight list,
    // Connect to socket, set handlers

    // Here we dispatch onSectorChange with [] as old sectors and getSectors as newSectors
    // onSectorChange will handle setting the right filter

    return Promise.all([
      dispatch(fetchStatus()),
      dispatch(onSectorChange([], sectors)),
      setupSocket(),
    ]);
  };
}

// TODO: Implement cleanUp
export function cleanUp() {
  return () => {
    disconnect();
  };
}

export function onSectorChange(oldSectors, newSectors) {
  return (dispatch) => {
    console.log('Dispatching xman on sector change');

    const sectorToNoSectors = _.isEmpty(oldSectors) !== _.isEmpty(newSectors);

    let newFilter;

    if(sectorToNoSectors) {
      newFilter = _.isEmpty(newSectors) ? 'all' : 'geographical';
    }

    return Promise.all([
      // setFilter will refresh xman list
      dispatch(setFilter(newFilter)),
    ]);
  };
}

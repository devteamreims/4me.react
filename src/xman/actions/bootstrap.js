import _ from 'lodash';

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

import {
  setFilter,
} from './list-filter';

import {
  getSectors,
} from '../../core/selectors/sector';

export function onSectorChange(oldSectors, newSectors) {
  return (dispatch, getState) => {
    console.log('Dispatching xman on sector change');
    console.log(oldSectors);
    console.log(newSectors);

    if(_.isEmpty(getSectors(getState()))) {
      // New sectors bound: nothing
    }

    return Promise.all([
      dispatch(refreshFullList()),
    ]);
  };
}

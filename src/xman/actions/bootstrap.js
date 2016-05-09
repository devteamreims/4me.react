import _ from 'lodash';

import {refreshFullList} from './flight-list';
import { fetchStatus } from './backend-status';

import io from 'socket.io-client';
import api from '../../api';

import {
  setupSocketIo,
  getSocket,
} from '../socket';

import {
  setFilter,
} from './list-filter';

import {
  getSectors,
} from '../../core/selectors/sector';

export function bootstrap() {
  return (dispatch, getState) => {
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

    const newSectors = getSectors(getState());

    // Here we dispatch onSectorChange with [] as old sectors and getSectors as newSectors
    // onSectorChange will handle setting the right filter

    return Promise.all([
      dispatch(fetchStatus()),
      dispatch(onSectorChange([], newSectors)),
      setupSocket(),
    ]);
  };
}



export function onSectorChange(oldSectors, newSectors) {
  return (dispatch, getState) => {
    console.log('Dispatching xman on sector change');

    if(_.isEmpty(oldSectors) !== _.isEmpty(newSectors)) {
      // Here, we have a transition like :
      // no sectors => sectors or sectors => no sectors
      const newFilter = _.isEmpty(newSectors) ? 'all' : 'geographical';
      return Promise.all([
        // setFilter will refresh xman list
        dispatch(setFilter(newFilter)),
      ]);
    }



    return Promise.all([
      dispatch(refreshFullList()),
    ]);
  };
}

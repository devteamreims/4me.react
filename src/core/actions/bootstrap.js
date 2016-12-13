// @flow
import { fetchClient } from './client';
import { fetchSectors } from './sector';
import { connectSocket, disconnectSocket } from './socket';

import type {
  ThunkAction,
} from '../../store';

export function startBootstrap(): ThunkAction<Promise<*>> {
  return (dispatch) => {
    // Start our bootstrap process

    // First, fetch our cwpId
    return Promise.all([
      dispatch(fetchClient()),
    ])
    // Then fetch our sectors and connect to mapping socket
    .then(() => {
      return Promise.all([
        dispatch(fetchSectors(true)),
        dispatch(connectSocket()),
      ]);
    });
  };
}

export function cleanUp(): ThunkAction<*> {
  return (dispatch) => { // eslint-disable-line no-unused-vars
    // TODO: Implement a proper clean up sequence here
    console.log('core/actions/bootstrap: Clean up sequence triggered !');
    return Promise.resolve(dispatch(disconnectSocket()));
  };
}

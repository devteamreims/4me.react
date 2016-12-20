// @flow
import { refreshMap } from './map';
import {
  connectSocket,
  disconnectSocket,
} from './socket';

import type {
  ThunkAction,
} from '../../store';

export function bootstrap(): ThunkAction<*> {
  return (dispatch) => {
    console.log('Bootstrapping MAPPING !!');

    return Promise.all([
      dispatch(refreshMap()),
      dispatch(connectSocket()),
    ]);
  };
}

export function cleanUp(): ThunkAction<*> {
  return (dispatch) => {
    console.log('Cleaning up MAPPING');
    dispatch(disconnectSocket());
  };
}

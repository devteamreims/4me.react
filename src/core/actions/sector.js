// @flow
export const FETCH = 'core/sector/FETCH';
export const COMPLETE = 'core/sector/COMPLETE';
export const ERROR = 'core/sector/ERROR';

import R from 'ramda';
import axios from 'axios';
import api from '../../api';

import type { Sectors } from '../types';

export type Action =
  | {|type: 'core/sector/COMPLETE', sectors: Sectors|}
  | {|type: 'core/sector/FETCH', isBootstrapping: boolean|}
  | {|type: 'core/sector/ERROR', error: string|};

import type {
  ThunkAction,
} from '../../store';

function completeAction(sectors: Sectors): Action {
  return {
    type: COMPLETE,
    sectors,
  };
}

function fetchAction(isBootstrapping: boolean = false): Action {
  return {
    type: FETCH,
    isBootstrapping,
  };
}

function errorAction(message: string): Action {
  return {
    type: ERROR,
    error: message,
  };
}


import { getClient } from '../selectors/client';

export function fetchSectors(isBootstrapping: boolean = false): ThunkAction<Promise<*>> {
  return (dispatch, getState) => {
    const myClient = getClient(getState());
    if(!myClient || myClient.type !== 'cwp') {
      return Promise.resolve();
    }

    dispatch(fetchAction(isBootstrapping));
    const url = api.core.mapping.sectors.getMine(myClient.id);

    return axios.get(url)
      .then((response) => {
        const sectors: Sectors = R.pathOr([], ['data', 'sectors'], response);
        return dispatch(completeAction(sectors));
      })
      .catch((error: {message: ?string}) => {
        dispatch(errorAction(error.message || 'Unknown error'));
        return Promise.reject(error);
      });
  };
}

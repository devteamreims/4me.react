// @flow
export const FETCH = 'core/cwp/FETCH';
export const COMPLETE = 'core/cwp/COMPLETE';
export const ERROR = 'core/cwp/ERROR';

import type { Client } from '../types';

export type Action =
  | {|type: 'core/cwp/COMPLETE', cwp: Client|}
  | {|type: 'core/cwp/FETCH'|}
  | {|type: 'core/cwp/ERROR', error: string|};

import axios from 'axios';
import _ from 'lodash';

import api from '../../api';

import type {
  ThunkAction,
} from '../../store';

export function fetchCwp(): ThunkAction<Promise<void>> {
  return (dispatch) => {
    dispatch(fetchAction());

    let apiUrl = api.core.mapping.cwp.getMine;

    if(process.env.CWP_ID || _.get(window, 'FOURME_CONFIG.overrideCwpId')) {
      apiUrl = api.core.mapping.cwp.getSingle(process.env.CWP_ID || _.get(window, 'FOURME_CONFIG.overrideCwpId'));
    }

    return axios.get(apiUrl)
      .then((response) => {
        const cwp: Client = _.pick(response.data, ['id', 'name', 'disabled', 'type']);
        return dispatch(completeAction(cwp));
      })
      .catch((error) => {
        dispatch(errorAction(error.message));
        return Promise.reject(error);
      });
  };
}

function completeAction(cwp: Client): Action {
  return {
    type: COMPLETE,
    cwp,
  };
}

function fetchAction(): Action {
  return {
    type: FETCH,
  };
}

function errorAction(error): Action {
  return {
    type: ERROR,
    error,
  };
}

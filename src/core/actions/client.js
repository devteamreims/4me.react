// @flow
export const FETCH = 'core/client/FETCH';
export const COMPLETE = 'core/client/COMPLETE';
export const ERROR = 'core/client/ERROR';

import type { Client } from '../types';

export type Action =
  | {|type: 'core/client/COMPLETE', client: Client|}
  | {|type: 'core/client/FETCH'|}
  | {|type: 'core/client/ERROR', error: string|};

import axios from 'axios';
import _ from 'lodash';

import api from '../api';
import getEnv from '4me.env';
const { clients } = getEnv(window.FOURME_CONFIG.FOURME_ENV);

import { getConfig } from '../config';

import type {
  ThunkAction,
} from '../../store';

export function fetchClient(): ThunkAction<Promise<void>> {
  return (dispatch) => {
    dispatch(fetchAction());

    // We have a forced clientId, shortcircuit XHR
    if(getConfig().overrideClientId) {
      console.log('OVERRIDING CLIENT ID !');

      const clientId = parseInt(getConfig().overrideClientId, 10);

      const client = clients.getClientById(clientId);

      if(!client) {
        return Promise.resolve()
          .then(() => {
            dispatch(errorAction('Not found'));
            return Promise.reject(new Error('Not found'));
          });
      }

      return Promise.resolve()
        .then(() => {
          const c: Client = _.pick(client, ['id', 'name', 'type']);
          dispatch(completeAction(c));
          return;
        });
    }

    const apiUrl = api.mapping.identify;
    return axios.get(apiUrl)
      .then((response) => {
        const client: Client = _.pick(response.data, ['id', 'name', 'type']);
        return dispatch(completeAction(client));
      })
      .catch((error) => {
        dispatch(errorAction(error.message));
        return Promise.reject(error);
      });
  };
}

function completeAction(client: Client): Action {
  return {
    type: COMPLETE,
    client,
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

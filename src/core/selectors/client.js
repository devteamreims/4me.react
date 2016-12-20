// @flow
import p from './prefix';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';

import type { Selector } from '../../store';
import type { State } from '../reducers/client';

import type {
  Client,
  ClientId,
  ClientType,
} from '../types';

export const getRaw: Selector<State> = state => _.get(p(state), 'client', {});

export const isLoading: Selector<boolean> = state => !!_.get(getRaw(state), 'isLoading');
export const isErrored: Selector<boolean> = state => !_.isEmpty(_.get(getRaw(state), 'error'));

export const getClientId: Selector<?ClientId> = state => _.get(getRaw(state), 'client.id');
export const getClientType: Selector<?ClientType> = state => _.get(getRaw(state), 'client.type');
export const getClientName: Selector<?string> = state => _.get(getRaw(state), 'client.name', '');

export const getClient: Selector<?Client> = createStructuredSelector({
  id: getClientId,
  type: getClientType,
  name: getClientName,
});

export const isNormalCwp: Selector<boolean> = state => getClientType(state) === 'cwp';
export const isSupervisor: Selector<boolean> = state => getClientType(state) === 'supervisor';
export const isFmp: Selector<boolean> = state => getClientType(state) === 'flow-manager';
export const isTechSupervisor: Selector<boolean> = state => getClientType(state) === 'tech-supervisor';

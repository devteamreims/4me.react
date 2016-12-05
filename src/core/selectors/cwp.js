// @flow
import p from './prefix';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';

import type { Selector } from '../../store';
import type { State } from '../reducers/cwp';

import type {
  Client,
  ClientId,
  ClientType,
} from '../types';

export const getRaw: Selector<State> = state => _.get(p(state), 'cwp', {});

export const isLoading: Selector<boolean> = state => !!_.get(getRaw(state), 'isLoading');
export const isErrored: Selector<boolean> = state => !_.isEmpty(_.get(getRaw(state), 'error'));

export const getCwpId: Selector<?ClientId> = state => _.get(getRaw(state), 'cwp.id');
export const getCwpType: Selector<?ClientType> = state => _.get(getRaw(state), 'cwp.type');
export const isCwpDisabled: Selector<boolean> = state => !!_.get(getRaw(state), 'cwp.disabled');
export const getCwpName: Selector<?string> = state => _.get(getRaw(state), 'cwp.name', '');

export const getClient: Selector<?Client> = createStructuredSelector({
  id: getCwpId,
  type: getCwpType,
  disabled: isCwpDisabled,
  name: getCwpName,
});

export const isNormalCwp: Selector<boolean> = state => getCwpType(state) === 'cwp';
export const isSupervisor: Selector<boolean> = state => getCwpType(state) === 'supervisor';
export const isFmp: Selector<boolean> = state => getCwpType(state) === 'flow-manager';
export const isTechSupervisor: Selector<boolean> = state => getCwpType(state) === 'tech-supervisor';

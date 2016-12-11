// @flow
import p from './prefix';
import _ from 'lodash';

import type { RootState, Selector } from '../../store';
import type { State } from '../reducers/sector';

import type {
  Sectors,
} from '../types';

export const getRaw: Selector<State> = state => p(state).sector;


export const isLoading: Selector<boolean> = state => getRaw(state).isLoading;

export const isErrored: Selector<boolean> = state => !_.isEmpty(_.get(getRaw(state), 'error'));

export const isBootstrapping: Selector<boolean> = state => !_.get(getRaw(state), 'isBootstrapped');

// export const getSectors: (RootState => Sectors) = state => getRaw(state).sectors;

export function getSectors(state: RootState): Sectors {
  return getRaw(state).sectors;
}

export const isCwpEmpty: Selector<boolean> = state => _.isEmpty(getSectors(state));

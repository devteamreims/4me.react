// @flow
import p from './prefix';
import _ from 'lodash';

import type { Selector } from '../../store';
import type { State } from '../reducers/socket';

export const getRaw: Selector<State> = state => _.get(p(state), 'socket', {});

export const isConnected: Selector<boolean> = state => !!_.get(getRaw(state), 'isConnected');

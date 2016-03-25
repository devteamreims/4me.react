import p from './prefix';
import _ from 'lodash';

export const getRaw = (state) => _.get(p(state), 'socket', {});

export const isConnected = (state) => !!_.get(getRaw(state), 'isConnected');

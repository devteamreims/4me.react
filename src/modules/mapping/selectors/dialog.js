import _ from 'lodash';
import p from './prefix';

export const getRaw = (state) => _.get(p(state), 'dialog', {});

export const isOpen = (state) => !!_.get(getRaw(state), 'open');

export const getCwpId = (state) => _.get(getRaw(state), 'cwpId');

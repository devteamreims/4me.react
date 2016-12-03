import p from './prefix';
import _ from 'lodash';

export const getRaw = (state) => _.get(p(state), 'sector', {});

export const isLoading = (state) => !!_.get(getRaw(state), 'isLoading');
export const isErrored = (state) => !_.isEmpty(_.get(getRaw(state), 'error'));

export const isBootstrapping = (state) => !_.get(getRaw(state), 'isBootstrapped');

export const getSectors = (state) => _.get(getRaw(state), 'sectors', []);
export const isCwpEmpty = (state) => _.isEmpty(getSectors(state));

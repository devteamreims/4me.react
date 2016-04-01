import p from './prefix';
import _ from 'lodash';

export const getRaw = (state) => _.get(p(state), 'cwp', {});

export const isLoading = (state) => !!_.get(getRaw(state), 'isLoading');
export const isErrored = (state) => !_.isEmpty(_.get(getRaw(state), 'error'));


export const getCwpId = (state) => _.get(getRaw(state), 'cwp.id');
export const getCwpType = (state) => _.get(getRaw(state), 'cwp.type');
export const isCwpDisabled = (state) => !!_.get(getRaw(state), 'cwp.disabled');
export const getCwpName = (state) => _.get(getRaw(state), 'cwp.name', '');

export const isNormalCwp = (state) => getCwpType(state) === 'cwp';
export const isSupervisor = (state) => getCwpType(state) === 'supervisor';
export const isFmp = (state) => getCwpType(state) === 'fmp';

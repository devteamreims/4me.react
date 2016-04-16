import _ from 'lodash';
import p from './prefix';

export const getRaw = (state) => _.get(p(state), 'cwp', {});

export const getCwps = (state) => _.get(getRaw(state), 'cwps');

export const isLoading = (state) => _.get(getRaw(state), 'isLoading');

export const getCwpById = (state, cwpId) => {
  return _.find(getCwps(state), cwp => parseInt(cwp.id) === parseInt(cwpId)) || {};
};

import { isDisabled as isCwpDisabled } from './map';

export const isDisabled = isCwpDisabled;

export const getName = (state, cwpId) => {
  return _.get(getCwpById(state, cwpId), 'name', `P${cwpId}`);
};

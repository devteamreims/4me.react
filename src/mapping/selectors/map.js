import _ from 'lodash';
import p from './prefix';

export const getRaw = (state) => _.get(p(state), 'map', {});

export const getMap = (state) => _.get(getRaw(state), 'map');

export const isLoading = (state) => !!_.get(getRaw(state), 'isLoading', false);

export const getCommitError = (state) => _.get(getRaw(state), 'commitError');
export const getRefreshError = (state) => _.get(getRaw(state), 'refreshError');
export const isErrored = (state) => getCommitError(state) !== null || getRefreshError(state) !== null;

export const getMapByCwpId = (state, cwpId) => {
  return _.find(getMap(state), m => parseInt(m.cwpId) === parseInt(cwpId)) || {};
};

const emptySectors = [];
export const getSectorsByCwpId = (state, cwpId) => {
  return _.get(getMapByCwpId(state, cwpId), 'sectors', emptySectors);
};

export const isCwpEmpty = (state, cwpId) => _.isEmpty(getSectorsByCwpId(state, cwpId));

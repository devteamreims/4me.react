import _ from 'lodash';
import p from './prefix';


export const getRaw = (state) => _.get(p(state), 'profile', {});

export const isLoading = (state) => !!_.get(getRaw(state), 'isLoading', false);

export const getSelectedIfplId = (state) => _.get(getRaw(state), 'ifplId');

export const getProfile = (state) => _.get(getRaw(state), 'data', {});

export const isEmpty = (state) => _.isEmpty(getProfile(state));

export const getCallsign = (state) => _.get(getProfile(state), 'callsign', '');
export const getDeparture = (state) => _.get(getProfile(state), 'departure', '');
export const getDestination = (state) => _.get(getProfile(state), 'destination', '');
export const getEobt = (state) => _.get(getProfile(state), 'eobt');
export const getPointProfile = (state) => _.get(getProfile(state), 'pointProfile', []);
export const getLastUpdated = (state) => _.get(getProfile(state), 'fetched', 0);
export const getDelay = (state) => _.get(getProfile(state), 'delay', 0);

export const getError = (state) => _.get(getRaw(state), 'error', null);

export const getFlight = (state) => _.pick(
  getProfile(state),
  ['ifplId', 'callsign', 'departure', 'destination', 'eobt', 'fetched'],
);

export const isErrored = (state) => getError(state) !== null;

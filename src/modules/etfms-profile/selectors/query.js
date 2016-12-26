import _ from 'lodash';
import p from './prefix';


export const getRaw = (state) => _.get(p(state), 'query', {});

export const getQueryCallsign = (state) => _.get(getRaw(state), 'callsign', '');

const emptyFlights = [];
export const getFlights = (state) => _.get(getRaw(state), 'flights', emptyFlights);

export const isLoading = (state) => !!_.get(getRaw(state), 'isLoading', false);

export const getError = (state) => _.get(getRaw(state), 'error', null);

export const isErrored = (state) => !!getError(state);

export const hasMultipleResults = (state) => _.size(getFlights(state)) > 1;

export const hasNoResults = (state) => getQueryCallsign(state) && _.size(getFlights(state)) === 0;

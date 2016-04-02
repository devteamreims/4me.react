import _ from 'lodash';
import p from './prefix';

export const getRaw = (state) => _.get(p(state), 'autocomplete', {});

const emptyFlights = [];
export const getFlights = (state) => _.get(getRaw(state), 'flights', emptyFlights);

export const getQuery = (state) => _.get(getRaw(state), 'query', '');

export const isLoading = (state) => !!_.get(getRaw(state), 'isLoading', false);

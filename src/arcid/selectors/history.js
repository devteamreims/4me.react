import _ from 'lodash';
import p from './prefix';


export const getRaw = (state) => _.get(p(state), 'history', {});

const emptyHistory = [];
export const getFlights = (state) => _.get(getRaw(state), 'flights', emptyHistory);

export const isLoading = (state) => !!_.get(getRaw(state), 'isLoading', false);

export const isFlightInHistory = (ifplId) => (state) => !_.isEmpty(_.find(getFlights(state), f => f.ifplId === ifplId));

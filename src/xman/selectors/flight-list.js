import _ from 'lodash';
import p from './prefix';

export const getRaw = (state) => _.get(p(state), 'flightList', {});

export const isLoading = (state) => !!_.get(getRaw(state), 'isLoading', false);

const emptyFlightList = [];
export const getFlights = (state) => _.get(getRaw(state), 'flights', emptyFlightList);

export const getKnownFlightIds = (state) => _.map(getFlights(state), f => f.ifplId);

export const getFlightByIfplId = (state, ifplId) => _.find(getFlights(state), f => f.ifplId === ifplId);

import {
  getFilter,
} from './list-filter';

import {
  getSectors,
} from '../../core/selectors/sector';

export const getQueryParams = (state) => {
  const sectors = getSectors(state);
  const selectedFilter = getFilter(state);

  // No sectors bound, return empty
  if(selectedFilter === 'all' || _.isEmpty(sectors)) {
    return {};
  }

  switch(selectedFilter) {
    case 'geographical':
      return {
        sectors,
      };
    case 'vertical':
      return {
        sectors,
        verticalFilter: true,
      };
  }

  return {};
};

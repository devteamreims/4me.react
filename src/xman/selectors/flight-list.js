import _ from 'lodash';
import p from './prefix';
import R from 'ramda';

export const getRaw = (state) => _.get(p(state), 'flightList', {});

export const isLoading = (state) => !!_.get(getRaw(state), 'isLoading', false);

const emptyFlightList = [];
export const getFlights = (state) => _.get(getRaw(state), 'flights', emptyFlightList);

export const getKnownFlightIds = (state) => _.map(getFlights(state), f => f.ifplId);

export const getFlightByIfplId = (state, ifplId) => _.find(getFlights(state), f => f.ifplId === ifplId);

import {
  isFlightHighlighted,
  isFlightTonedDown,
} from './flight';

import {
  isForcedOff,
  isForcedMcs,
} from './status';

export const getRichFlights = state => {
  const flights = R.map(flight => {
    const {
      ifplId,
      destination,
    } = flight;

    return {
      isHighlighted: isFlightHighlighted(state, ifplId),
      isTonedDown: isFlightTonedDown(state, ifplId),
      isForcedOff: isForcedOff(state, destination),
      isForcedMcs: isForcedMcs(state, destination),
      ...flight,
    };
  }, getFlights(state));

  return flights;
};

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

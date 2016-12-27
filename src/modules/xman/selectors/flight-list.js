// @flow
import _ from 'lodash';
import p from './prefix';
import R from 'ramda';

import type {
  Flight,
  RichFlight,
  IfplId,
} from '../types/flight';

export const getRaw = (state: Object) => _.get(p(state), 'flightList', {});

type IsLoading = Object => boolean;
export const isLoading: IsLoading = state => !!_.get(getRaw(state), 'isLoading', false);


type GetFlights = Object => ?Array<Flight>;
const emptyFlightList = [];
export const getFlights: GetFlights = state => _.get(getRaw(state), 'flights', emptyFlightList);

type GetKnownFlightIds = Object => ?Array<IfplId>;
export const getKnownFlightIds: GetKnownFlightIds = state => _.map(getFlights(state), f => f.ifplId);

type GetFlightByIfplId = (Object, IfplId) => ?Flight;
// eslint-disable-next-line max-len
export const getFlightByIfplId: GetFlightByIfplId = (state, ifplId) => _.find(getFlights(state), f => f.ifplId === ifplId);

import {
  isFlightHighlighted,
  isFlightTonedDown,
} from './flight';

import {
  isForcedOff,
  isForcedMcs,
} from './status';

type GetRichFlights = Object => ?Array<RichFlight>;
export const getRichFlights: GetRichFlights = state => {
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
} from '../../../core/selectors/sector';

export const getQueryParams = (state: Object) => {
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

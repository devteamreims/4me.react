import _ from 'lodash';

import {
  getRaw,
} from './flight-list';



export function getVerticalFilter(state) {
  return _.get(getRaw(state), 'verticalFilter');
}

export function getGeographicalFilter(state) {
  return _.get(getRaw(state), 'geographicalFilter');
}


import {
  getSectors,
} from '../../core/selectors/sector';

export const shouldShowFilters = (state) => !_.isEmpty(getSectors(state));

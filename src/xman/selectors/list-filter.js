import _ from 'lodash';

import {
  getRaw,
} from './flight-list';


export function getFilter(state) {
  return _.get(getRaw(state), 'listFilter');
}

export const isAllFilterEnabled = (state) => getFilter(state) === 'all';
export const isVerticalFilterEnabled = (state) => getFilter(state) === 'vertical';
export const isGeographicalFilterEnabled = (state) => getFilter(state) === 'geographical';

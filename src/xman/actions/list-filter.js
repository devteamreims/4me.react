export const SET_FILTER = 'xman/listFilter/SET_FILTER';


import {
  getVerticalFilter,
  getGeographicalFilter,
} from '../selectors/list-filter';

import {
  refreshFullList,
} from './flight-list';

import {
  getQueryParams,
} from '../selectors/flight-list';

import {
  setSubscriptionFilter,
} from '../socket';

import {
  clear as clearFlightList,
} from './flight-list';

export function setFilter(type = 'all') {
  return (dispatch, getState) => {
    const acceptedValues = ['all', 'geographical', 'vertical'];

    if(!_.includes(acceptedValues, type)) {
      throw new Error(`xman/actions/list-filter/setFilter : type ${type} is not a valid filter`);
      return;
    }

    // Dispatch action
    switch(type) {
      case 'all':
        dispatch(setAllFilterAction());
        break;
      case 'geographical':
        dispatch(setGeographicalFilterAction());
        break;
      case 'vertical':
        dispatch(setVerticalFilterAction());
        break;
    }

    // Send socket change
    const queryParams = getQueryParams(getState());
    setSubscriptionFilter(queryParams);

    // Clear current list
    dispatch(clearFlightList());

    // Refresh full list
    dispatch(refreshFullList());
  }
}

export function setGeographicalFilter() {
  return dispatch => dispatch(setFilter('geographical'));
}

export function setVerticalFilter() {
  return dispatch => dispatch(setFilter('vertical'));
}

export function setAllFilter() {
  return dispatch => dispatch(setFilter('all'));
}

function setAllFilterAction() {
  return {
    type: SET_FILTER,
    value: 'all',
  }
}

function setVerticalFilterAction() {
  return {
    type: SET_FILTER,
    value: 'vertical',
  };
}

function setGeographicalFilterAction() {
  return {
    type: SET_FILTER,
    value: 'geographical',
  };
}

import _ from 'lodash';

import {
  SET_FETCHER_SERVICES_STATUS,
} from '../../actions/backend-status';

import {
  SET_FORCE_OFF,
  SET_FORCE_MCS,
} from '../../actions/fetcher-status';

const defaultState = {};

export default function fetchersStatusReducers(state = defaultState, action) {
  switch(action.type) {
    case SET_FETCHER_SERVICES_STATUS:
      return Object.assign({}, action.payload);
    case SET_FORCE_OFF:
    case SET_FORCE_MCS: {
      const fetcher = _.get(action.payload, 'fetcher');
      const fetcherStatus = _.get(state, fetcher);

      if(_.isEmpty(fetcherStatus)) {
        console.log(`xman/fetchersStatusReducers: ${fetcher} is an unknown fetcher !`);
        return state;
      }

      const payload = _.omit(action.payload, ['fetcher']);

      const newFetcherStatus = Object.assign({}, fetcherStatus, payload);

      return Object.assign({}, state, {[fetcher]: newFetcherStatus});
    }
  }

  return state;
}

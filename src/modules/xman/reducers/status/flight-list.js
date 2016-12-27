import {
  COMPLETE as REFRESH_COMPLETE,
  FAIL as REFRESH_FAIL,
} from '../../actions/flight-list';

const defaultState = {
  status: 'normal',
  lastUpdated: Date.now(),
};

export default function flightListStatusReducer(state = defaultState, action) {
  switch(action.type) {
    case REFRESH_COMPLETE:
      return Object.assign({}, defaultState, {lastUpdated: Date.now()});
    case REFRESH_FAIL:
      return Object.assign({}, state, {status: 'error', lastUpdated: Date.now()});
  }

  return state;
}

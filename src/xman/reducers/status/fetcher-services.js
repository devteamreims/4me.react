import {
  SET_FETCHER_SERVICES_STATUS,
} from '../../actions/backend-status';

const defaultState = {};

export default function fetchersStatusReducers(state = {}, action) {
  switch(action.type) {
    case SET_FETCHER_SERVICES_STATUS:
      return Object.assign({}, action.payload);
  }

  return state;
}

import {
  START,
  COMPLETE,
  FAIL,
} from '../actions/profile';

const defaultState = {
  isLoading: false,
  ifplId: null,
  data: {},
  error: null,
};


export default function results(state = defaultState, action) {
  switch(action.type) {
    case START:
      return Object.assign({}, state, {
        isLoading: true,
        ifplId: action.ifplId,
        data: {},
        error: null,
      });
    case FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        ifplId: null,
        data: {},
        error: action.error,
      });
    case COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        ifplId: action.ifplId,
        data: _.omit(action, 'type'),
        error: null,
      });
  }
  return state;
}
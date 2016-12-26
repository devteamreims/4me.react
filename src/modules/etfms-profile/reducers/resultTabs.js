const defaultState = {
  visibleTab: 'history',
};

import {
  SELECT_TAB,
} from '../actions/resultTabs';

export default function resultTabReducer(state = defaultState, action) {
  switch(action.type) {
    case SELECT_TAB:
      return Object.assign({}, state, {visibleTab: action.tab});
  }
  return state;
}

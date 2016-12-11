// @flow

import type { Action } from '../store';
import type { Exact } from '../utils/types';

import {
  INCREMENT,
  DECREMENT,
} from './actions';

export type State = Exact<{
  counter: number,
}>;

const defaultState: State = {
  counter: 0,
};

export default function exampleReducer(state: State = defaultState, action: Action): State {
  switch(action.type) {
    case INCREMENT:
      return Object.assign({}, state, {counter: state.counter + 1});
    case DECREMENT: {
      // Do not allow negative values in our counter
      if(state.counter === 0) {
        return state;
      }
      return Object.assign({}, state, {counter: state.counter - 1});
    }
  }

  return state;
}

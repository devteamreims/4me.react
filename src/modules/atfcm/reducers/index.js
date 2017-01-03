// @flow
import type { Action } from '../../../store';

export type State = {};

const defaultState: State = {};

export default function exampleReducer(state: State = defaultState, action: Action): State {
  if(action) {
    return state;
  }
  return state;
}

// @flow
import type { RootState } from '../../store';
import type { CoreState } from '../reducers';

export default function prefix(state: RootState): CoreState {
  return state.core;
}

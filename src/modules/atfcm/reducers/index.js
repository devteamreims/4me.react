// @flow
import { combineReducers } from 'redux';

import entities from './entities';
import ui from './ui';

import type { State as EntityState } from './entities';
import type { State as UiState } from './ui';

export type State = {
  entities: EntityState,
  ui: UiState,
};

export default combineReducers({
  entities,
  ui,
});

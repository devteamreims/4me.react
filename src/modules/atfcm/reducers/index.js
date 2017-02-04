// @flow
import { combineReducers } from 'redux';

export type State = Object;

import entities from './entities';
import ui from './ui';

export default combineReducers({
  entities,
  ui,
});

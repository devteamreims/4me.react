// @flow

import { combineReducers } from 'redux';

import addStamModal from './addStamModal';
import stams from './stams';
import flights from './flights';

export default combineReducers({
  addStamModal,
  stams,
  flights,
});

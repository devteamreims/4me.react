// @flow

import { combineReducers } from 'redux';

import addStamModal from './addStamModal';
import stams from './stams';

export default combineReducers({
  addStamModal,
  stams,
});

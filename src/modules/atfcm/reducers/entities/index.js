// @flow
import { combineReducers } from 'redux';

import stams from './stams';
import flights from './flights';

export default combineReducers({
  stams,
  flights,
});

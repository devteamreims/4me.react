import { combineReducers } from 'redux';

import map from './map';
import status from './status';
import dialog from './dialog';


const rootReducer = combineReducers({
  map,
  dialog,
  status,
});

export default rootReducer;

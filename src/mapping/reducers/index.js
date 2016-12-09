import { combineReducers } from 'redux';

import cwp from './cwp';
import map from './map';
import status from './status';
import dialog from './dialog';


const rootReducer = combineReducers({
  cwp,
  map,
  dialog,
  status,
});

export default rootReducer;

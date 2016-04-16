import { combineReducers } from 'redux';

import cwp from './cwp';
import map from './map';
import status from './status';
import suggest from './suggest';
import dialog from './dialog';


const rootReducer = combineReducers({
  cwp,
  map,
  suggest,
  dialog,
  status,
});

export default rootReducer;

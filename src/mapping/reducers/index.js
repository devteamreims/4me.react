import { combineReducers } from 'redux';

import cwp from './cwp';
import map from './map';
//import statusReducer from './status';
import suggest from './suggest';
import dialog from './dialog';


const rootReducer = combineReducers({
  cwp,
  map,
  suggest,
  dialog,
});

export default rootReducer;

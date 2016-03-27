import { combineReducers } from 'redux';

import cwp from './cwp';
import map from './map';
//import statusReducer from './status';
import suggest from './suggest';


const rootReducer = combineReducers({
  cwp,
  map,
  suggest,
});

export default rootReducer;

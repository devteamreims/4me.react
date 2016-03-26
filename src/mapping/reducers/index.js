import { combineReducers } from 'redux';

import cwp from './cwp';
import map from './map';
//import statusReducer from './status';
//import suggestReducer from './suggest';


const rootReducer = combineReducers({
  cwp,
  map,
});

export default rootReducer;

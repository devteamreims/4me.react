import { combineReducers } from 'redux';

import flightList from './flight-list';
import status from './status';
import highlighter from './highlighter';


const rootReducer = combineReducers({
  flightList,
  highlighter,
  status,
});

export default rootReducer;

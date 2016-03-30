import { combineReducers } from 'redux';

//import flightList from './flight-list';
//import statusReducer from './status';
import highlighter from './highlighter';
//import whoAmIReducer from './who-am-i';


const rootReducer = combineReducers({
  //flightList: flightListReducer,
  highlighter,
});

export default rootReducer;

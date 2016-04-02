import { combineReducers } from 'redux';
//import profileReducer from './profile';
//import queryReducer from './query';
import history from './history';
import socket from './socket';
import autocomplete from './autocomplete';


const rootReducer = combineReducers({
//  profile: profileReducer,
//  query: queryReducer,
  history,
  socket,
  autocomplete,
});

export default rootReducer;

import { combineReducers } from 'redux';

import profile from './profile';
import query from './query';
import history from './history';
import socket from './socket';
import autocomplete from './autocomplete';
import resultTabs from './resultTabs';


const rootReducer = combineReducers({
  profile,
  query,
  history,
  socket,
  autocomplete,
  resultTabs,
});

export default rootReducer;

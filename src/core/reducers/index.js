import { combineReducers } from 'redux';

import cwp from './cwp';
import sector from './sector';
import socket from './socket';
import returnToDashboard from './returnToDashboard';


const rootReducer = combineReducers({
  cwp,
  sector,
  socket,
  returnToDashboard,
});

export default rootReducer;

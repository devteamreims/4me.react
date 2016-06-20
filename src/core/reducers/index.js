import { combineReducers } from 'redux';

import cwp from './cwp';
import sectorTree from './sectorTree';
import sector from './sector';
import socket from './socket';
import returnToDashboard from './returnToDashboard';


const rootReducer = combineReducers({
  cwp,
  sectorTree,
  sector,
  socket,
  returnToDashboard,
});

export default rootReducer;

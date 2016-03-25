import { combineReducers } from 'redux';

import cwp from './cwp';
import sectorTree from './sectorTree';
import sector from './sector';
import socket from './socket';


const rootReducer = combineReducers({
  cwp,
  sectorTree,
  sector,
  socket,
});

export default rootReducer;

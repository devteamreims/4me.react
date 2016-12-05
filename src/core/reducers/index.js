// @flow
import { combineReducers } from 'redux';

import cwp from './cwp';
import sector from './sector';
import socket from './socket';
import returnToDashboard from './returnToDashboard';

import type { Exact } from '../../utils/types';

import type { State as ClientState } from './cwp';
import type { State as SectorState } from './sector';
import type { State as SocketState } from './socket';
import type { State as ReturnToDashboardState } from './returnToDashboard';

export type CoreState = Exact<{
  cwp: ClientState,
  sector: SectorState,
  socket: SocketState,
  returnToDashboard: ReturnToDashboardState,
}>;

const rootReducer = combineReducers({
  cwp,
  sector,
  socket,
  returnToDashboard,
});

export default rootReducer;

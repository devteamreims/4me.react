// @flow
import { combineReducers } from 'redux';

import client from './client';
import sector from './sector';
import socket from './socket';
import returnToDashboard from './returnToDashboard';

import type { Exact } from '../../shared/types';

import type { State as ClientState } from './client';
import type { State as SectorState } from './sector';
import type { State as SocketState } from './socket';
import type { State as ReturnToDashboardState } from './returnToDashboard';

export type CoreState = Exact<{
  client: ClientState,
  sector: SectorState,
  socket: SocketState,
  returnToDashboard: ReturnToDashboardState,
}>;

const rootReducer = combineReducers({
  client,
  sector,
  socket,
  returnToDashboard,
});

export default rootReducer;

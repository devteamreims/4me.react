// @flow
import { combineReducers } from 'redux';

import stams from './stams';
import flights from './flights';

import type { State as StamState } from './stams';
import type { State as FlightState } from './flights';

export type State = {
  stams: StamState,
  flights: FlightState,
};

export default combineReducers({
  stams,
  flights,
});

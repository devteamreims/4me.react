// @flow

import { combineReducers } from 'redux';

import addStamModal from './addStamModal';
import addFlightModal from './addFlightModal';
import stams from './stams';
import flights from './flights';
import autocomplete from './autocomplete';

import type { State as StamModalState } from './addStamModal';
import type { State as FlightModalState } from './addFlightModal';
import type { State as StamState } from './stams';
import type { State as FlightState } from './flights';
import type { State as AutocompleteState } from './autocomplete';

export type State = {
  addStamModal: StamModalState,
  stams: StamState,
  flights: FlightState,
  addFlightModal: FlightModalState,
  autocomplete: AutocompleteState,
};

export default combineReducers({
  addStamModal,
  stams,
  flights,
  addFlightModal,
  autocomplete,
});

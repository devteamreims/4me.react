// @flow
import { combineReducers } from 'redux';


import xmanReducer from '../modules/xman/reducers';
import mappingReducer from '../modules/mapping/reducers';
import exampleReducer from '../modules/example-module/reducer';
import etfmsProfileReducer from '../modules/etfms-profile/reducers';

import manifest from '../modules/manifest';
import type { ModuleState } from '../modules/manifest';


import coreReducer from '../core/reducers';
import type { CoreState } from '../core/reducers';

const reducers = {
  core: coreReducer,
  [manifest.example.stateSlice]: exampleReducer,
  [manifest.xman.stateSlice]: xmanReducer,
  [manifest.mapping.stateSlice]: mappingReducer,
  [manifest.etfmsProfile.stateSlice]: etfmsProfileReducer,
};

export function createRootReducer() {
  return combineReducers(reducers);
}

export type RootState =
  & {core: CoreState}
  & ModuleState

// @flow
import { combineReducers } from 'redux';

import * as MappingModule from '../modules/mapping';

import * as ExampleModule from '../modules/example-module';
import type { ExampleModuleState } from '../modules/example-module';

import * as XmanModule from '../modules/xman';
import type { XmanState } from '../modules/xman';

import * as EtfmsProfileModule from '../modules/etfms-profile';

import * as AtfcmModule from '../modules/atfcm';
import type { AtfcmModuleState } from '../modules/atfcm';

import coreReducer from '../core/reducers';
import type { CoreState } from '../core/reducers';

export function createRootReducer() {
  return combineReducers({
    core: coreReducer,
    [ExampleModule.name]: ExampleModule.getReducer(),
    [MappingModule.name]: MappingModule.getReducer(),
    [XmanModule.name]: XmanModule.getReducer(),
    [EtfmsProfileModule.name]: EtfmsProfileModule.getReducer(),
    [AtfcmModule.name]: AtfcmModule.getReducer(),
  });
}

export type RootState =
  & ExampleModuleState
  & XmanState
  & AtfcmModuleState
  & {core: CoreState};

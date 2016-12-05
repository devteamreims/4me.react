// @flow
import { combineReducers } from 'redux';

import * as MappingModule from '../mapping';

import * as ExampleModule from '../example-module';

import * as XmanModule from '../xman';
import type { XmanState } from '../xman';

import * as EtfmsProfileModule from '../arcid';

import coreReducer from '../core/reducers';
import type { CoreState } from '../core/reducers';

export function createRootReducer() {
  return combineReducers({
    core: coreReducer,
    [ExampleModule.name]: ExampleModule.getReducer(),
    [MappingModule.name]: MappingModule.getReducer(),
    [XmanModule.name]: XmanModule.getReducer(),
    [EtfmsProfileModule.name]: EtfmsProfileModule.getReducer(),
  });
}

export type RootState =
  & XmanState
  & {core: CoreState};

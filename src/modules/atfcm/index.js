// @flow
export const name: string = 'atfcm';
export const uri: string = '/atfcm';

import MenuButtonComponent from './components/MenuButton';
import MainComponent from './components/Main';
import StatusComponent from './components/Status';
// import WidgetComponent from './components/Widget';

export const MenuButton = MenuButtonComponent;
export const Main = MainComponent;
export const Status = StatusComponent;
// export const Widget = WidgetComponent;

// This function will be called when the app starts
import exampleReducer from './reducers';
export function getReducer() {
  return exampleReducer;
}

// 4ME uses flow types
import type { State } from './reducers';
import type { Exact } from '../../shared/types';

/**
 * 4ME expects a type export defining our state shape
 * Note that we place our state under the key 'exampleModule'
 * which is the value of our export `name`;
 *
 */
export type ExampleModuleState = Exact<{
  atfcm: State,
}>;


// CORE will allocate a state slice keyed by our exported `name`
// import type { Selector } from '../../store';
//
// import type { StatusLevel } from '../../shared/types/status';

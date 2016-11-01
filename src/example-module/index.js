

import exampleReducer from './reducer';

import { p } from './selectors';

export const name = 'exampleModule';
export const uri = '/example-module';

import MenuButtonComponent from './components/MenuButton';
import MainComponent from './components/Main';
import StatusComponent from './components/Status';
import WidgetComponent from './components/Widget';

export const MenuButton = MenuButtonComponent;
export const Main = MainComponent;
export const Status = StatusComponent;
export const Widget = WidgetComponent;

// This function will be called when the app starts,
export function getReducer() {
  return exampleReducer;
}

export function getStatusString(state) {
  return p(state).counter >= 10 ?
    'warning' :
    'normal';
}


/**
 * This is the main interface for 4ME UI modules
 * A 4ME Module must export a set of things to integrate with 4ME UI framework
 *
 * * name (string) : A key to identify this module. This key will be used as a state slice
 * in case you wish to integrate with redux
 *
 * * uri (string) : A string to configure the main router, must be prefixed by '/'
 *
 * * MenuButton (React Component) : this will be rendered in the left navigation bar
 * This component is rendered at anytime. This is a good place to initialize a 4ME module and
 * perform bootstrapping stuff.
 *
 * * Widget (React Component) : this will be rendered on the Dashboard page
 * This component is only rendered on the dashboard page
 *
 * * Main (React Component) : this will be rendered in the content area when a specific route is hit
 * This component is only rendered when the route is a match.
 * Note : react-router v4 allows you to define nested routes here. TODO: write documentation
 *
 * * Status (React Component) : this will be rendered on the status page.
 *
 * 4ME CORE uses redux for state management. The API allows the module writer to integrate with the
 * main redux store, which enables devtools to work properly.
 * Here you can export a function called `getReducer` which should return your module root reducer.
 * The function will receive a key as argument which corresponds to the state slice allowed to your component.
 *
 * The last piece of the puzzle is status. CORE displays a status icon in the topbar. The icon displayed is based
 * on the status of each 4ME module loaded in the app. Therefore, the API exposes a way for your component to
 * bubble up a status change occuring in your module.
 * The implementation is based on redux. 4ME modules should export a `getStatus` function.
 * This function is a `selector`. It will receive the full redux state as argument and
 * must return one of these values : `error`, `warning`, `normal`.
 *
 */

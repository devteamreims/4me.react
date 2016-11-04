// import React from 'react';
//
// import { Route } from 'react-router';
//
// import rootComponent from './components/Root';
// import rootReducer from './reducers';
//
// import {
//   bootstrap,
//   onSectorChange,
// } from './actions/bootstrap';
//
// import { getStatus } from './selectors/status';
//
// import { shouldRedirectToDashboard } from './selectors/returnToDashboard';
// import withRedirectToDashboard from '../core/wrappers/withRedirectToDashboard';
// import { getIndexRoute } from '../core/selectors/routes';
// const getTargetRoute = getIndexRoute;
//
// const enhancedComponent = withRedirectToDashboard(
//   shouldRedirectToDashboard,
//   getTargetRoute
// )(rootComponent);


export const name = 'etfmsProfile';
export const uri = '/etfms-profile';

import rootReducer from './reducers';
export const getReducer = () => rootReducer;

import MenuButtonComponent from './components/MenuButton';
import MainComponent from './components/Main';
import StatusComponent from './components/Status';
import WidgetComponent from './components/Widget';

export const Main = MainComponent;
export const Status = StatusComponent;
export const MenuButton = MenuButtonComponent;
export const Widget = WidgetComponent;

export { getStatusString } from './selectors/status';

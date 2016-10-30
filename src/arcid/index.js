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


import MenuButtonComponent from './components/MenuButton';
import MainComponent from './components/Main';
import StatusComponent from './components/Status';

import rootReducer from './reducers';

import { setSlice } from './selectors/prefix';

const getReducer = slug => {
  setSlice(slug);
  return rootReducer;
};

import {
  getStatusString,
} from './selectors/status';

export default {
  MenuButtonComponent,
  MainComponent,
  StatusComponent,
  getReducer,
  getStatus: getStatusString,
};


// export default {
//   name: 'arcid',
//   displayName: 'ETFMS PROFILE',
//   bootstrap,
//   rootComponent,
//   routes: <Route key="arcid" path="/arcid" component={enhancedComponent} />,
//   rootReducer,
//   onSectorChange,
//   getStatus,
// };

import React from 'react';

import MainRouter from './MainRouter';
import { Provider } from 'react-redux';

const Root = ({store}) => {

  const DevTools = process.env.NODE_ENV === 'development' && require('./dev/DevTools').default;

  return (
    <Provider store={store}>
      <div id="main-container">
        <MainRouter />
        {DevTools && <DevTools />}
      </div>
    </Provider>
  );

}

export default Root;

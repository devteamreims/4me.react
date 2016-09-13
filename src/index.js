// Import Roboto
import './styles/font.css';
import './styles/styles.scss';

import React from 'react';
import { render } from 'react-dom';
import configureStore  from './store/configureStore';

import Perf from 'react-addons-perf';

window.Perf = Perf;

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


import Root from './Root';


const store = configureStore();
const rootElement = document.getElementById('app');

if(process.env.NODE_ENV !== 'development') {
  render(
    <Root store={store} />,
    rootElement
  );
} else {
  const { AppContainer } = require('react-hot-loader');
  // Render the React application to the DOM
  render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    rootElement
  );

  if (module.hot) {
    module.hot.accept('./Root', () => {
      render(
        <AppContainer>
          <Root store={store} />
        </AppContainer>,
        rootElement
      );
    });
  }
}

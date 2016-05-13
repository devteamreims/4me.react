// Import Roboto
import './styles/font.css';

import './styles/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore  from './store/configureStore';

import Perf from 'react-addons-perf';

window.Perf = Perf;

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import MainRouter from './MainRouter';

const store = configureStore();
const rootElement = document.getElementById('app');

let ComponentEl;

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('./dev/DevTools').default;

  // If using routes
  ComponentEl = (
    <div id="main-container">
      <MainRouter />
      <DevTools />
    </div>
  );
} else {
  ComponentEl = (
    <div id="main-container">
      <MainRouter />
    </div>
  );
}

// Render the React application to the DOM
ReactDOM.render(
  <Provider store={store}>
    {ComponentEl}
  </Provider>,
  rootElement
);

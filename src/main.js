// Import Roboto
import './styles/font.css';

import './styles/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore  from './store/configureStore';
import { Router, hashHistory } from 'react-router';

import Perf from 'react-addons-perf';

window.Perf = Perf;

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import routes from './routes';

const store = configureStore();
const rootElement = document.getElementById('app');

let ComponentEl;

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('./dev/DevTools').default;

  // If using routes
  ComponentEl = (
    <div id="main-container">
      <Router history={hashHistory} routes={routes} />
      <DevTools />
    </div>
  );
} else {
  ComponentEl = (
    <div>
      <Router history={hashHistory} routes={routes} />
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

// Import Roboto
import './styles/font.css';
import './styles/styles.scss';

import React from 'react';
import { render } from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import Perf from 'react-addons-perf';

window.Perf = Perf;

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import Root from './Root';

const rootElement = document.getElementById('app');

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  rootElement
);

if(module.hot) {
  module.hot.accept('./Root', () => {
    console.debug('HMR : Reloading ROOT !');
    render(
      <AppContainer>
        <Root />
      </AppContainer>,
      rootElement
    );
  });
}

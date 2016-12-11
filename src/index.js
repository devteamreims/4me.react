// First normalize
import 'normalize.css';
// Then we have an issue with material-ui
// https://github.com/callemall/material-ui/issues/4008
// https://github.com/pjhjohn/jsonplaceholder-client/pull/64
import './styles/material-ui-fix.css';
// Import Roboto
import './styles/font.css';
// Import global styles
import './styles/styles.css';

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

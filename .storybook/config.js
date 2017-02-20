import 'babel-polyfill';
import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';

import '@kadira/storybook/addons';
import '@kadira/storybook-addon-knobs/register';

const req = require.context('../src', true, /.stories.js$/);

import {} from './injectTapEvent';

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
  req.keys().forEach(filename => req(filename));
}

import '../src/styles/font.css';
import '../src/styles/styles.css';

import '../src/config.api';

import { Root } from '../src/Root';

addDecorator(story => (
  <Root>
    {story()}
  </Root>
));

configure(loadStories, module);

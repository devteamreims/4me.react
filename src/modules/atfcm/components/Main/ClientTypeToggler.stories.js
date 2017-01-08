// @flow
import React from 'react';

import { storiesOf, action } from '@kadira/storybook';

import ClientTypeToggler from './ClientTypeToggler';

storiesOf('atfcm.ClientTypeToggler', module)
  .add('with props', () => (
    <ClientTypeToggler
      defaultSelected="cwp"
      onChange={action('switch-type')}
    />
  ));

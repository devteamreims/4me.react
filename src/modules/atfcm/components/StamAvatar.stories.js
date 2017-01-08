// @flow
import React from 'react';

import { storiesOf } from '@kadira/storybook';
import { host } from 'storybook-host';

import { StamAvatar } from './StamAvatar';

storiesOf('atfcm.StamAvatar', module)
  .addDecorator(host({
    title: 'An avatar to distinguish stam requests',
    align: 'center middle',
  }))
  .add('with empty props', () => <StamAvatar />)
  .add('with stam as a number', () => (
    <StamAvatar
      stamId={12345}
    />
  ))
  .add('with stam as a string', () => (
    <StamAvatar
      stamId="54321"
    />
  ))
  .add('with children, without stamId', () => (
    <StamAvatar>KR</StamAvatar>
  ))
  .add('with children and stamId', () => (
    <StamAvatar
      stamId={6789}
    >
      KR
    </StamAvatar>
  ))
  .add('with overriden color', () => (
    <StamAvatar
      stamId={5687}
      color="red"
    >
      HYR
    </StamAvatar>
  ));

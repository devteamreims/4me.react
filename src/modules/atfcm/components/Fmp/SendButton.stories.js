// @flow
import React, { Component } from 'react';

import { storiesOf, action } from '@kadira/storybook';
import { host } from 'storybook-host';

import { Card, CardText } from 'material-ui/Card';
import { LightTheme } from '../../../../shared/components/Theme';

import { SendButton } from './SendButton';


storiesOf('atfcm.Fmp.StamCard.SendButton', module)
  .addDecorator(story => (
    <LightTheme>
      <Card>
        <CardText>{story()}</CardText>
      </Card>
    </LightTheme>
  ))
  .addDecorator(host({
    title: 'StamCard send button',
    align: 'center middle',
    width: '300px',
    height: '100px',
  }))
  .add('Empty state', () => (
    <SendButton />
  ));

// @flow
import React, { Component } from 'react';

import {
  light,
  dark,
} from '../theme';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const lightTheme = getMuiTheme(light);
const darkTheme = getMuiTheme(dark);

type Props = {
  children?: React.Element<*>,
};

export class LightTheme extends Component {
  props: Props;

  render() {
    const { children } = this.props;

    return (
      <MuiThemeProvider muiTheme={lightTheme}>
        {children}
      </MuiThemeProvider>
    );
  }
}

export class DarkTheme extends Component {
  props: Props;

  render() {
    const { children } = this.props;

    return (
      <MuiThemeProvider muiTheme={darkTheme}>
        {children}
      </MuiThemeProvider>
    );
  }
}

export default LightTheme;

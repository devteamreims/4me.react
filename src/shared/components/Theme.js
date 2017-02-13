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

type ThemeProps = {
  children?: React.Element<*>,
  theme?: ThemeId,
};

export type ThemeId = 'light' | 'dark' | 'default';

export class Theme extends Component {
  props: ThemeProps;

  getTheme() {
    const { theme } = this.props;

    switch(theme) {
      case 'light':
        return lightTheme;
      case 'dark':
      default:
        return darkTheme;
    }
  }

  render() {
    const { children } = this.props;

    return (
      <MuiThemeProvider muiTheme={this.getTheme()}>
        {children}
      </MuiThemeProvider>
    );
  }
}

type Props = {
  children?: React.Element<*>,
};

export const LightTheme = ({ children }: Props) => (
  <Theme theme="light">
    {children}
  </Theme>
);

export const DarkTheme = ({ children }: Props) => (
  <Theme theme="dark">
    {children}
  </Theme>
);


export default Theme;

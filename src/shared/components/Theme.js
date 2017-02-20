// @flow
import React from 'react';

import theme from '../theme';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const darkTheme = getMuiTheme(theme);

type Props = {
  children?: React.Element<*>,
};

export const DarkTheme = ({ children }: Props) => (
  <MuiThemeProvider muiTheme={darkTheme}>
    {children}
  </MuiThemeProvider>
);


export default DarkTheme;

import * as Colors from 'material-ui/styles/colors';

import * as ColorManipulator from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
// import zIndex from 'material-ui/lib/styles/zIndex';

import {
  primary1Color,
  primary2Color,
  primary3Color,
  accent1Color,
  accent2Color,
  accent3Color,
  textColor,
  canvasColor,
} from './colors';

export const dark = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color,
    primary2Color,
    primary3Color,
    accent1Color,
    accent2Color,
    accent3Color,
    textColor,
    alternateTextColor: '#303030',
    canvasColor,
    borderColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
    disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
    pickerHeaderColor: ColorManipulator.fade(Colors.fullWhite, 0.12),
    clockCircleColor: ColorManipulator.fade(Colors.fullWhite, 0.12),
  },
};

export const light = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color,
    primary2Color,
    primary3Color,
    accent1Color,
    accent2Color,
    accent3Color,
  },
};

export default dark;

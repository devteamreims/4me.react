import * as Colors from 'material-ui/lib/styles/colors';

import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

import {
  primary1Color,
  primary2Color,
  primary3Color,
  accent1Color,
  accent2Color,
  accent3Color,
  textColor,
} from './colors';

export default {
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
    canvasColor: '#303030',
    borderColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
    disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
    pickerHeaderColor: ColorManipulator.fade(Colors.fullWhite, 0.12),
    clockCircleColor: ColorManipulator.fade(Colors.fullWhite, 0.12),
  },
};

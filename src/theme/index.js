import * as Colors from 'material-ui/lib/styles/colors';

import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.indigo500,
    primary2Color: Colors.indigo700,
    primary3Color: Colors.indigo200,
    accent1Color: Colors.lightBlueA200,
    accent2Color: Colors.pinkA400,
    accent3Color: Colors.pinkA100,
    textColor: Colors.fullWhite,
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
    disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
    pickerHeaderColor: ColorManipulator.fade(Colors.fullWhite, 0.12),
    clockCircleColor: ColorManipulator.fade(Colors.fullWhite, 0.12),
  },
};

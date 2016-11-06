import {
  indigo300,
  indigo500,
  orange300,
  orange800,
  pink500,
  fullWhite,
  fullBlack,
} from 'material-ui/styles/colors';

import * as ColorManipulator from 'material-ui/utils/colorManipulator';

export const cwpButton = {
  normal: {
    backgroundColor: indigo500,
    textColor: fullWhite,
  },
  empty: {
    backgroundColor: indigo300,
    textColor: fullBlack,
  },
  disabled: {
    backgroundColor: ColorManipulator.fade(fullWhite, 0.3),
    textColor: fullBlack,
  },
  mineNormal: {
    backgroundColor: orange800,
    textColor: fullBlack,
  },
  mineEmpty: {
    backgroundColor: orange300,
    textColor: fullBlack,
  },
  hovered: {
    backgroundColor: pink500,
    textColor: fullBlack,
  }
};

export default {
  cwpButton,
};

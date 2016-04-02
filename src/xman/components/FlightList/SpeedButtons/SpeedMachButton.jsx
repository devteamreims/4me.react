import React, { Component } from 'react';

import {
  orange300,
  orange800,
  green500,
  fullWhite,
  fullBlack,
} from 'material-ui/lib/styles/colors';

import XmanButton from './XmanButton';

import PureRenderMixin from 'react-addons-pure-render-mixin';

function prepareStyles(xmanState = 'empty') {
  let labelColor = fullBlack;
  let backgroundColor = fullWhite;

  switch(xmanState) {
    case 'advised':
      backgroundColor = orange800;
      labelColor = fullWhite;
      break;
    case 'advisedSoft':
      backgroundColor = orange300;
      break;
    case 'selected':
      backgroundColor = green500;
      labelColor = fullWhite;
      break;
  }
  return {
    labelColor,
    backgroundColor,
  };
}

class SpeedMachButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {
      xmanState,
      style = {},
      ...other,
    } = this.props;

    const {
      labelColor,
      backgroundColor,
    } = prepareStyles(xmanState);

    Object.assign(style, {
      fontWeight: 'inherit',
    });

    return <XmanButton
      {...other}
      labelColor={labelColor}
      backgroundColor={backgroundColor}
      style={style}
    />
  }
}

SpeedMachButton.PropTypes = {
  xmanState: React.PropTypes.oneOf(['advised', 'advisedSoft', 'selected', 'empty']),
};

export default SpeedMachButton;
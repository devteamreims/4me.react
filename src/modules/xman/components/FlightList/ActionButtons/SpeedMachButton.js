import React, { Component } from 'react';

import {
  orange200,
  orange800,
  green500,
  fullWhite,
  fullBlack,
  grey700,
} from 'material-ui/styles/colors';

import XmanButton from './XmanButton';

import {pure} from 'recompose';

function prepareStyles(xmanState = 'empty', dimmed = false) {
  let labelColor = fullBlack;
  let backgroundColor = fullWhite;

  if(dimmed) {
    backgroundColor = grey700;
  }

  switch(xmanState) {
    case 'advised':
      backgroundColor = orange800;
      labelColor = fullWhite;
      break;
    case 'advisedSoft':
      backgroundColor = orange200;
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
  render() {
    const {
      xmanState,
      style = {},
      dimmed = false,
      ...other,
    } = this.props;

    const {
      labelColor,
      backgroundColor,
    } = prepareStyles(xmanState, dimmed);

    Object.assign(style, {
      fontWeight: 'inherit',
    });

    return (
      <XmanButton
        {...other}
        labelColor={labelColor}
        backgroundColor={backgroundColor}
        style={style}
      />
    );
  }
}

SpeedMachButton.propTypes = {
  xmanState: React.PropTypes.oneOf(['advised', 'advisedSoft', 'selected', 'empty']),
  dimmed: React.PropTypes.bool,
};

export default pure(SpeedMachButton);

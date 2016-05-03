import React, { Component } from 'react';

import RaisedButton from 'material-ui/lib/raised-button';

import UndoIcon from 'material-ui/lib/svg-icons/content/undo';

import {
  redA200,
  grey700,
  fullBlack,
  fullWhite,
} from 'material-ui/lib/styles/colors';

import XmanButton from './XmanButton';


class UndoButton extends Component {
  render() {
    let {
      disabled,
      backgroundColor = fullWhite,
      iconColor = redA200,
      style,
      dimmed = false,
      ...other,
    } = this.props;


    if(dimmed) {
      backgroundColor = grey700;
    } else if(disabled) {
      backgroundColor = null;
    }

    return <XmanButton
      disabled={disabled}
      icon={<UndoIcon />}
      labelColor={fullBlack}
      backgroundColor={disabled ? null : backgroundColor}
      style={style}
      {...other}
    />
  }
}

UndoButton.PropTypes = {
  disabled: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
};

export default UndoButton;

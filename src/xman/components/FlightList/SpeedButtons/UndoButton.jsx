import React, { Component } from 'react';

import RaisedButton from 'material-ui/lib/raised-button';

import UndoIcon from 'material-ui/lib/svg-icons/content/undo';

import {
  redA200,
  fullBlack,
} from 'material-ui/lib/styles/colors';

import XmanButton from './XmanButton';


class UndoButton extends Component {
  render() {
    const {
      disabled,
      backgroundColor = redA200,
      iconColor = fullBlack,
      style,
      ...other,
    } = this.props;

    return <XmanButton
      disabled={disabled}
      icon={<UndoIcon />}
      iconColor={iconColor}
      backgroundColor={disabled ? null : backgroundColor}
      style={style}
      {...other}
    />
  }
}

UndoButton.PropTypes = {
  disabled: React.PropTypes.bool,
};

export default UndoButton;

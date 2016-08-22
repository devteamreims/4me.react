import React, { Component } from 'react';

import XmanButton from './XmanButton';

import AirplaneIcon from 'material-ui/svg-icons/maps/flight';

import {
  green500,
  fullWhite,
  fullBlack,
  grey700,
  orange800,
} from 'material-ui/styles/colors';

import {pure} from 'recompose';

class McsButton extends Component {
  render() {
    const {
      selected = false,
      dimmed = false,
      advised = false,
      ...other,
    } = this.props;

    let backgroundColor = fullWhite;
    let labelColor = fullBlack;

    if(dimmed) {
      backgroundColor = grey700;
    }

    if(advised) {
      backgroundColor = orange800;
      labelColor = fullWhite;
    }

    if(selected) {
      backgroundColor = green500;
      labelColor = fullWhite;
    }

    return <XmanButton
      icon={<AirplaneIcon />}
      backgroundColor={backgroundColor}
      labelColor={labelColor}
      {...other}
    />
  }
}

McsButton.propTypes = {
  selected: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
};

export default pure(McsButton);

import React, { Component } from 'react';

import XmanButton from './XmanButton';

import AirplaneIcon from 'material-ui/lib/svg-icons/maps/flight';

import {
  green500,
  fullWhite,
  fullBlack,
} from 'material-ui/lib/styles/colors';

import PureRenderMixin from 'react-addons-pure-render-mixin';

class McsButton extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {
      selected = false,
      ...other,
    } = this.props;

    let backgroundColor = fullWhite;
    let labelColor = fullBlack;

    if(selected) {
      backgroundColor = green500;
      labelColor = fullWhite;
    }

    return <XmanButton
      {...other}
      icon={<AirplaneIcon />}
      backgroundColor={backgroundColor}
      labelColor={labelColor}
    />
  }
}

export default McsButton;

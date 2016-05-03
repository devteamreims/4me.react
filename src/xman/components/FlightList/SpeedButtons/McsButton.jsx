import React, { Component } from 'react';

import XmanButton from './XmanButton';

import AirplaneIcon from 'material-ui/lib/svg-icons/maps/flight';

import {
  green500,
  fullWhite,
  fullBlack,
  grey700,
} from 'material-ui/lib/styles/colors';

import {
  canvasColor,
} from '../../../../theme/colors';

import PureRenderMixin from 'react-addons-pure-render-mixin';

class McsButton extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {
      selected = false,
      dimmed = false,
      ...other,
    } = this.props;

    let backgroundColor = fullWhite;
    let labelColor = fullBlack;

    if(dimmed) {
      backgroundColor = grey700;
    }

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

McsButton.PropTypes = {
  selected: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
};

export default McsButton;

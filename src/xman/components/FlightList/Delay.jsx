import React, { Component } from 'react';

import {
  faintBlack,
} from 'material-ui/lib/styles/colors';

function delayToColor(delay, maxDelay = 20) {
  const gradient = [
    '#B2FF59',
    '#FFD740',
    '#FFAB40',
    '#FF6E40',
    '#FF5252'
  ];

  let index = Math.floor(delay/maxDelay * (gradient.length-1));
  index = index > (gradient.length - 1) ? gradient.length-1 : index;

  return gradient[index];
}

class Delay extends Component {
  render() {
    const delay = this.props.delay || 0;

    const color = delayToColor(delay);

    return (
      <span style={{color}}>{delay}</span>
    );
  }
}

Delay.PropTypes = {
  delay: React.PropTypes.number
};

export default Delay;

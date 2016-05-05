import React, { Component } from 'react';

import {
  faintBlack,
  orange800,
  yellow300,
  green500,
} from 'material-ui/lib/styles/colors';

function delayToColor(delay, maxDelay = 20) {
  if(delay >= 7) {
    return orange800;
  } else if (delay >= 5 && delay < 7) {
    return yellow300;
  } else {
    return green500;
  }
}

class Delay extends Component {
  render() {
    const delay = Math.floor((this.props.delay || 0) / 60);

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

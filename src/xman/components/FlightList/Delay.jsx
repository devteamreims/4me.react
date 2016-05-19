import React, { Component } from 'react';

import {
  faintBlack,
  orange800,
  yellow300,
  green500,
} from 'material-ui/lib/styles/colors';

function delayToColor(delay) {
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
    const {
      delay,
      isTonedDown,
    } = this.props;

    const displayDelay = delay === -1 ? 0 : Math.floor((delay || 0) / 60);

    const color = isTonedDown ? null : delayToColor(displayDelay);

    return (
      <span style={{color}}>{displayDelay}</span>
    );
  }
}

Delay.propTypes = {
  delay: React.PropTypes.number,
  isTonedDown: React.PropTypes.bool,
};

export default Delay;

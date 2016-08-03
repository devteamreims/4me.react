import React from 'react';

import {
  orange800,
  yellow300,
  green500,
} from 'material-ui/styles/colors';

function delayToColor(delay) {
  if (delay >= 7) {
    return orange800;
  } else if (delay >= 5 && delay < 7) {
    return yellow300;
  }

  return green500;
}

const Delay = ({delay, isTonedDown}) => {
  const displayDelay = delay === -1 ? 0 : Math.floor((delay || 0) / 60);

  const color = isTonedDown ? null : delayToColor(displayDelay);

  return (
    <span style={{color}}>{displayDelay}</span>
  );
};

Delay.propTypes = {
  delay: React.PropTypes.number,
  isTonedDown: React.PropTypes.bool,
};

export default Delay;

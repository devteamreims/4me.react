import React, { Component } from 'react';

import ColorizedContent from '../../../../shared/components/ColorizedContent';

function flightLevelToHash(flightLevel) {
  // When the flight is in evolution, fall back to specific color
  if(flightLevel % 10 !== 0) {
    return -1;
  }
  return Math.floor(flightLevel / 10);
}


class ColoredFlightLevel extends Component {
  render() {
    const {
      flightLevel,
    } = this.props;

    return (
      <ColorizedContent hash={flightLevelToHash(parseInt(flightLevel))}>
        {flightLevel}
      </ColorizedContent>
    );
  }
}

ColoredFlightLevel.propTypes = {
  flightLevel: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
};

export default ColoredFlightLevel;

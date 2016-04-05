import React, { Component } from 'react';

import * as Colors from 'material-ui/lib/styles/colors';

import _ from 'lodash';

const colorLevel = '200';

const flightLevelColors = _.map([
  'pink',
  'purple',
  'indigo',
  'lightBlue',
  'green',
  'deepOrange',
  'brown',
], str => Colors[str + colorLevel]);


function getFlightLevelColor(flightLevel, flightLevelColors) {
  const maxIndex = flightLevelColors.length;
  if(flightLevel % 10 !== 0) {
    return Colors['blueGrey' + colorLevel];
  }

  const hash = Math.floor(flightLevel / 10);

  const index = hash % maxIndex;

  return flightLevelColors[index];
}


class ColoredFlightLevel extends Component {

  static defaultProps = {
    flightLevelColors,
  };

  render() {
    const {
      flightLevel,
      flightLevelColors,
    } = this.props;

    const flightLevelColor = getFlightLevelColor(flightLevel, flightLevelColors);

    return (
      <span style={{color: flightLevelColor}}>{flightLevel}</span>
    );
  }
}

ColoredFlightLevel.PropTypes = {
  flightLevel: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
  flightLevelColors: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default ColoredFlightLevel;

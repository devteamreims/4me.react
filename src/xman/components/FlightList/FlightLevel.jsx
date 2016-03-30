import React, { Component } from 'react';

class FlightLevel extends Component {
  render() {
    return (
      <span>{this.props.currentFlightLevel}</span>
    );
  }
}

FlightLevel.PropTypes = {
  currentFlightLevel: React.PropTypes.number,
};

export default FlightLevel;

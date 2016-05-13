import React, { Component } from 'react';

import FlatButton from 'material-ui/lib/flat-button';
import ToneDowner from './ToneDowner';

class FlightLevel extends Component {
  render() {
    const {
      currentFlightLevel,
      ...other,
    } = this.props;

    if(!currentFlightLevel) {
      return <span></span>;
    }

    return (
      <ToneDowner
        path="position.vertical.currentFlightLevel"
        value={currentFlightLevel}
      >
        <span>{currentFlightLevel}</span>
      </ToneDowner>
    );
  }
}

FlightLevel.propTypes = {
  currentFlightLevel: React.PropTypes.number,
};

export default FlightLevel;

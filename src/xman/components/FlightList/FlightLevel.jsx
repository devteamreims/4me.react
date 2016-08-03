import React from 'react';

import ToneDowner from './ToneDowner';

const FlightLevel = ({currentFlightLevel}) => {
  if (!currentFlightLevel) {
    return <span />;
  }

  return (
    <ToneDowner
      path="position.vertical.currentFlightLevel"
      value={currentFlightLevel}
    >
      <span>{currentFlightLevel}</span>
    </ToneDowner>
  );
};

FlightLevel.propTypes = {
  currentFlightLevel: React.PropTypes.number,
};

export default FlightLevel;

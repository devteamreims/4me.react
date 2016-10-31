import React from 'react';

import ToneDowner from './ToneDowner';

const Callsign = ({callsign, destination}) => {
  const style = {
    callsign: {
      display: 'block',
      fontSize: 24,
    },
    destination: {
      fontWeight: 'normal',
    },
  };

  return (
    <div>
      <span style={style.callsign}>{callsign}</span>
      {destination &&
        <ToneDowner
          path="destination"
          value={destination}
          style={style.destination}
        >
          <span>{destination}</span>
        </ToneDowner>
      }
    </div>
  );
};

Callsign.propTypes = {
  callsign: React.PropTypes.string.isRequired,
  destination: React.PropTypes.string,
};

export default Callsign;

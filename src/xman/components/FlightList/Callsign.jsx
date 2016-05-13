import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/lib/flat-button';
import ToneDowner from './ToneDowner';

class Callsign extends Component {
  render() {
    const {
      callsign,
      destination,
      ...other,
    } = this.props;

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
        <ToneDowner
          path="destination"
          value={destination}
          style={style.destination}
        >
          <span>{destination}</span>
        </ToneDowner>
      </div>
    );
  }
}

Callsign.propTypes = {
  callsign: React.PropTypes.string.isRequired,
  destination: React.PropTypes.string.isRequired,
};



export default Callsign;

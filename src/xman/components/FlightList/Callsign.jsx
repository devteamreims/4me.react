import React, { Component } from 'react';
import { connect } from 'react-redux';


class Callsign extends Component {
  render() {
    return (
      <div>
        <span>{this.props.callsign}</span>
        <span>{this.props.destination}</span>
      </div>
    );
  }
}

Callsign.PropTypes = {
  callsign: React.PropTypes.string.isRequired,
  destination: React.PropTypes.string.isRequired,
};

export default Callsign;

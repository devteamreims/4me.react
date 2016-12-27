import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlightList from '../FlightList';

class History extends Component {

  handleTouchTap = (event, flight) => {
    const {
      getProfile,
    } = this.props;

    console.log(`Clicked on history flight with ifplId : ${flight.ifplId}`);

    getProfile(flight);
  };

  render() {
    const {
      flights,
      selectedIfplId,
      ...other,
    } = this.props;

    return (
      <FlightList
        flights={flights}
        onTouchTap={this.handleTouchTap}
        selectedIfplId={selectedIfplId}
        {...other}
      />
    );
  }
}

import {
  getFlights,
} from '../../selectors/history';

import {
  getSelectedIfplId,
} from '../../selectors/profile';

const mapStateToProps = (state) => {
  const flights = getFlights(state);
  const selectedIfplId = getSelectedIfplId(state);

  return {
    flights,
    selectedIfplId,
  };
};

import {
  getProfile,
} from '../../actions/profile';

const mapDispatchToProps = {
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(History);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlightList from '../FlightList';
import Spinner from '../Spinner';

class Results extends Component {

  handleTouchTap = (event, flight) => {
    const {
      getProfile,
      onClickOnFlight,
    } = this.props;

    if(onClickOnFlight) {
      onClickOnFlight();
    }

    console.log(`Clicked on results flight with ifplId : ${flight.ifplId}`);

    getProfile(flight);
  };

  render() {
    const {
      flights,
      selectedIfplId,
      isLoading,
      areResultsEmpty,
      queryString,
      ...other,
    } = this.props;

    return (
      <div>
        <Spinner
          show={isLoading}
          style={{padding: '30px'}}
        />
        <FlightList
          flights={flights}
          onTouchTap={this.handleTouchTap}
          selectedIfplId={selectedIfplId}
          {...other}
        />
        {areResultsEmpty &&
          <div>
            {queryString} : Nothing found !
          </div>
        }
      </div>
    );
  }
}

import {
  isLoading,
  getFlights,
  getQueryCallsign,
  hasNoResults,
} from '../../selectors/query';

import {
  getSelectedIfplId,
} from '../../selectors/profile';

const mapStateToProps = (state) => {
  const flights = getFlights(state);
  const selectedIfplId = getSelectedIfplId(state);

  const queryString = getQueryCallsign(state);
  const areResultsEmpty = !isLoading(state) && hasNoResults(state);

  return {
    flights,
    selectedIfplId,
    isLoading: isLoading(state),
    queryString,
    areResultsEmpty,
  };
};

import {
  getProfile,
} from '../../actions/profile';

const mapDispatchToProps = {
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);

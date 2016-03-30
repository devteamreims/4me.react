import React, { Component } from 'react';
import { connect } from 'react-redux';

import LinearProgress from 'material-ui/lib/linear-progress';

import Callsign from './Callsign';
import Delay from './Delay';
import FlightLevel from './FlightLevel';
import Cop from './Cop';
import SpeedButtons from './SpeedButtons';

const styles = {
  table: {
    width: '100%',
    color: '#FFF',
  },
};

const Loader = (props) => {
  if(props.visible) {
    return (
      <LinearProgress mode="indeterminate" />
    );
  }

  return (<span></span>);
};

class FlightList extends Component {
  render() {
    const {
      flights,
      isLoading,
      ...other,
    } = this.props;

    return (
      <div>
        <Loader />
        <table
          style={styles.table}
        >
          <thead>
            <tr>
              <th>Callsign</th>
              <th>Delay</th>
              <th>FL</th>
              <th>COP</th>
              <th>Speed</th>
              <th>Applied</th>
            </tr>
          </thead>
          <tbody>
            {_.map(flights, (flight, index) => {
              return (
                <tr
                  key={index}
                  style={flight.isHighlighted ? {backgroundColor: 'red'} : {}}
                >
                  <td>
                    <Callsign
                      callsign={flight.arcid}
                      destination={flight.destination}
                    />
                  </td>
                  <td>
                    <Delay
                      delay={flight.delay}
                    />
                  </td>
                  <td>
                    <FlightLevel
                      currentFlightLevel={flight.position.vertical.currentFlightLevel}
                    />
                  </td>
                  <td>
                    <Cop
                      name="ABNUR"
                      targetTime="bla"
                      estimatedTime="bli"
                    />
                  </td>
                  <td>
                    <SpeedButtons
                      ifplId={flight.ifplId}
                    />
                  </td>
                  <td>UXR, 5 minutes ago</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

import {
  getFlights,
  isLoading,
} from '../../selectors/flight-list';

import {
  isFlightHighlighted,
} from '../../selectors/flight';

const mapStateToProps = (state) => {
  const flights = _.map(getFlights(state), flight => {
    return {
      isHighlighted: isFlightHighlighted(state, flight.ifplId),
      ...flight,
    };
  });

  return {
    flights,
    isLoading: isLoading(state),
  };
};

export default connect(mapStateToProps)(FlightList);

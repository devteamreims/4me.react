import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

class History extends Component {
  render() {
    const {
      flights,
    } = this.props;

    return (
      <List>
        {_.map(flights, (flight, index) => {
          const {
            callsign,
            departure,
            destination,
            eobt,
            ifplId,
          } = flight;

          const formattedEobt = moment.utc(eobt).format('YYYY-MM-DD HH:mm');
          return (
            <div key={index}>
              <ListItem
                primaryText={callsign}
                secondaryText={
                  <p>
                    <span>{departure} -> {destination}</span><br />
                    <span>{formattedEobt}</span>
                  </p>
                }
                secondaryTextLines={2}
              />
              <Divider />
            </div>
          );
        })}
      </List>
    );
  }
}

import {
  getFlights,
} from '../../selectors/history';

const mapStateToProps = (state) => {
  const flights = getFlights(state);

  return {
    flights,
  };
};

export default connect(mapStateToProps)(History);

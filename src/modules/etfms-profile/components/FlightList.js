import React, { Component } from 'react';

import _ from 'lodash';
import moment from 'moment';

import {
  List,
  ListItem,
} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import theme from '../../../theme';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';

const styles = {
  selectedItem: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  secondaryText: {
    color: ColorManipulator.fade(theme.palette.textColor, 0.5),
  },
};

class FlightList extends Component {

  getTouchTapHandler = (flight) => (event) => {
    const {
      onTouchTap,
    } = this.props;

    event.stopPropagation();

    if(onTouchTap) {
      onTouchTap(event, flight);
    }
  };

  render() {
    const {
      flights,
      selectedIfplId,
      ...other,
    } = this.props;

    return (
      <List
        {...other}
      >
        {_.map(flights, (flight, index) => {
          const {
            callsign,
            departure,
            destination,
            eobt,
            ifplId, // eslint-disable-line no-unused-vars
          } = flight;

          const itemStyle = {};

          if(selectedIfplId && flight.ifplId === selectedIfplId) {
            Object.assign(itemStyle, styles.selectedItem);
          }

          const formattedEobt = moment.utc(eobt).format('YYYY-MM-DD HH:mm');

          return (
            <div key={index}>
              <ListItem
                primaryText={callsign}
                secondaryText={
                  <p style={styles.secondaryText}>
                    <span>{departure} -> {destination}</span><br />
                    <span>{formattedEobt}</span>
                  </p>
                }
                secondaryTextLines={2}
                onTouchTap={this.getTouchTapHandler(flight)}
                style={itemStyle}
              />
              <Divider />
            </div>
          );
        })}
      </List>
    );
  }
}

FlightList.propTypes = {
  onTouchTap: React.PropTypes.func,
  flights: React.PropTypes.array.isRequired,
  selectedIfplId: React.PropTypes.string,
};


export default FlightList;

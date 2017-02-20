/* @flow */
import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { hashToColor } from '../../../../shared/components/ColorizedContent';
import Avatar from 'material-ui/Avatar';
import { transparent } from 'material-ui/styles/colors';

class StamList extends React.Component {

  renderFlights(flights, targetSector) {
    return flights.map(flight => (
      <ListItem
        primaryText={flight.arcid}
        disabled={true}
        leftAvatar={
          this.renderAvatar(targetSector)
        }
      />
    ));
  }

  renderAvatar(name) {
    return (
      <Avatar
        color={hashToColor(name, null)}
        backgroundColor={transparent}
        style={{left: 8}}
      >
        {name}
      </Avatar>
    );
  }

  render() {
    const { stams } = this.props;

    if(!Array.isArray(stams) || stams.length === 0) {
      return null;
    }

    return (
      <List>
        {stams.map(stam => [
          this.renderFlights(stam.flights, stam.offloadSector),
          <Divider />,
        ])}
      </List>
    );
  }
}

export default StamList;

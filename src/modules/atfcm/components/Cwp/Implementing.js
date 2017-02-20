/* @flow */
import React from 'react';

import R from 'ramda';
import F from 'flexbox-react';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import { transparent } from 'material-ui/styles/colors';
import { hashToColor } from '../../../../shared/components/ColorizedContent';

import {
  Beacon,
  FlightLevel,
  OnloadSector,
} from '../shared/FlightRow/AnnotatedIcons';

import type { ActiveStam } from '../../types';

type Props = {
  stams: Array<ActiveStam>,
};

class Implementing extends React.Component {
  props: Props;

  renderSingleStam(stam: ActiveStam) {
    const {
      offloadSector,
      flights,
    } = stam;

    return (
      <List>
        {flights.map(flight => {
          let leftAvatar = null;

          if(flight === R.head(flights)) {
            leftAvatar = (
              <Avatar
                color={hashToColor(offloadSector, 'dark')}
                backgroundColor={transparent}
              >
                {offloadSector}
              </Avatar>
            );
          }

          const subItemStyle = {
            flexGrow: 1,
            flexBasis: 1,
          };

          return [
            <ListItem
              disabled={true}
              leftAvatar={leftAvatar}
              insetChildren={!leftAvatar}
            >
              <F flexDirection="column">
                <h3
                  style={{
                    margin: 0,
                    marginBottom: 8,
                    fontSize: 22,
                  }}
                >
                  {flight.arcid}
                </h3>
                <F
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <OnloadSector
                    style={subItemStyle}
                    sector={flight.onloadSector}
                  />
                  <Beacon
                    style={subItemStyle}
                    beacon={flight.constraint.beacon}
                  />
                  <FlightLevel
                    style={subItemStyle}
                    flightLevel={flight.constraint.flightLevel}
                  />
                </F>
              </F>
            </ListItem>,
            flight === R.last(flights) ? null : <Divider inset={true} />,
          ];
        })}
      </List>
    );
  }

  render() {
    const { stams } = this.props;
    return (
      <div>
        {stams.map(stam => [
          this.renderSingleStam(stam),
          stam === R.last(stams) ? null : <Divider />,
        ])}
      </div>
    );
  }
}

export default Implementing;

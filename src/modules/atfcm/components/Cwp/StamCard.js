// @flow
import React, { Component } from 'react';

import {
  Card,
  CardActions,
  CardText,
} from 'material-ui/Card';

import FlightRow from '../shared/FlightRow';

import * as Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

import F from 'flexbox-react';

import ColorizedContent from '../../../../shared/components/ColorizedContent';

import type {
  ActiveStam,
  Flight,
} from '../../types';

type Props = {
  stam: ActiveStam,
};

export class StamCard extends Component {
  props: Props;

  _renderFlights() {
    const {
      stam,
    } = this.props;

    const {
      flights,
    } = stam;


    if(flights.length === 0) {
      return <div>No flights yet !</div>;
    }

    return flights.map(flight => (
      <FlightRow
        flight={flight}
        hideActions={true}
        theme="dark"
      />
    ));
  }

  render() {
    const {
      stam,
    } = this.props;

    const {
      offloadSector,
    } = stam;

    const colorizedOffloadSector = (
      <ColorizedContent theme="light" hash={offloadSector}>
        {offloadSector}
      </ColorizedContent>
    );

    return (
      <Card>
        <F
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          flewGrow={1}
          style={{marginLeft: 16, marginRight: 16}}
        >
          <h2>OFFLOAD {colorizedOffloadSector}</h2>
        </F>
        <Divider />
        <CardText>
          <F flexDirection="column">
            {this._renderFlights()}
          </F>
        </CardText>
      </Card>
    );
  }
}


export default StamCard;

// @flow
import React, { Component } from 'react';

import moment from 'moment';

import { LightTheme } from '../../../../../shared/components/Theme';
import ColorizedContent from '../../../../../shared/components/ColorizedContent';

import FlightRow from '../FlightRow';

import F from 'flexbox-react';
import Divider from 'material-ui/Divider';
import {
  Card,
  CardActions,
  CardTitle,
  CardText,
} from 'material-ui/Card';

import type {
  HistoryStam,
} from '../types';

type Props = {
  stam: HistoryStam,
};


export class ArchiveCard extends Component {
  props: Props;

  getTitle() {
    const { stam } = this.props;

    const {
      offloadSector,
      flights,
    } = stam;

    const pluralFlights = flights.length === 1 ? 'flight' : 'flights';

    const flightString = `${flights.length || 0} ${pluralFlights}`;

    const colorizedOffloadSector = (
      <ColorizedContent theme="light" hash={offloadSector}>
        {offloadSector}
      </ColorizedContent>
    );

    return (
      <span>{colorizedOffloadSector} - {flightString}</span>
    );
  }

  getSubtitle(): string {
    const { stam } = this.props;

    const {
      sendTime,
    } = stam;

    return `Archived ${moment(sendTime).fromNow()}`;
  }

  renderFlights() {
    const { stam } = this.props;
    const { flights } = stam;

    return flights.map(flight => (
      <FlightRow
        flight={flight}
        hideActions={true}
      />
    ));
  }

  render() {
    return (
      <LightTheme>
        <Card>
          <CardTitle
            title={this.getTitle()}
            subtitle={this.getSubtitle()}
            actsAsExpander={true}
            showExpandableButton={true}
          />
          <Divider />
          <CardText expandable={true}>
            <F flexDirection="column">
              {this.renderFlights()}
            </F>
          </CardText>
        </Card>
      </LightTheme>
    );
  }
}

export default ArchiveCard;

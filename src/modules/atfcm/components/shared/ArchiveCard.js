// @flow
import React, { Component } from 'react';

import moment from 'moment';

import { Theme } from '../../../../shared/components/Theme';
import ColorizedContent from '../../../../shared/components/ColorizedContent';

import FlightRow from './FlightRow';

import F from 'flexbox-react';
import Divider from 'material-ui/Divider';
import {
  Card,
  CardTitle,
  CardText,
} from 'material-ui/Card';

import type {
  HistoryStam,
} from '../../types';

import type { ThemeId } from '../../../../shared/types';

type Props = {
  stam: HistoryStam,
  theme?: ThemeId,
  subtitle?: ?React$Element<any>,
};


export class ArchiveCard extends Component {
  props: Props;

  static defaultProps = {
    theme: 'light',
  };

  getTitle() {
    const {
      stam,
      theme,
    } = this.props;

    const {
      offloadSector,
      flights,
    } = stam;

    const pluralFlights = flights.length === 1 ? 'flight' : 'flights';

    const flightString = `${flights.length || 0} ${pluralFlights}`;

    const colorizedOffloadSector = (
      <ColorizedContent theme={theme} hash={offloadSector}>
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
    const {
      stam,
      theme,
    } = this.props;

    const { flights } = stam;

    return flights.map(flight => (
      <FlightRow
        flight={flight}
        hideActions={true}
        theme={theme}
      />
    ));
  }

  render() {
    const {
      theme,
      subtitle,
    } = this.props;

    return (
      <Theme theme={theme}>
        <Card
          style={{
          }}
        >
          <CardTitle
            title={this.getTitle()}
            subtitle={subtitle === undefined ? this.getSubtitle() : subtitle}
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
      </Theme>
    );
  }
}

export default ArchiveCard;

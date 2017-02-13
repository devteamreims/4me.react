/* @flow */
import React from 'react';
import F from 'flexbox-react';
import R from 'ramda';

import type { Sectors } from '../../../../core/types';
type OwnProps = {
  sectors: Sectors,
};

type Props = OwnProps & StateProps;

class CwpMain extends React.Component {
  props: Props;

  renderStam(stam: ActiveStam) {
    return (
      <div>
        <h3>{stam.offloadSector}</h3>
        <ul>
          {stam.flights.map(flight =>
            <li>{flight.arcid}</li>
          )}
        </ul>
      </div>
    );
  }

  render() {
    const {
      implementingStams,
      onloadStams,
      offloadStams,
    } = this.props;

    return (
      <F
        flexDirection="row"
        flexGrow={1}
      >
        <F
          flexDirection="column"
          flexGrow={2}
          style={{border: '1px solid red'}}
        >
          <h1>To do</h1>
          {implementingStams.map(this.renderStam)}
        </F>
        <F
          flexDirection="column"
          flexGrow={1}
          style={{border: '1px solid blue'}}
        >
          <F flexDirection="column">
            <h1>Onload</h1>
            {onloadStams.map(this.renderStam)}
          </F>
          <F flexDirection="column">
            <h1>Offload</h1>
            {offloadStams.map(this.renderStam)}
          </F>
        </F>
      </F>
    );
  }
}

import { connect } from 'react-redux';
import type { RootState, Dispatch } from '../../../../store';
import { getActiveStams } from '../../reducers/entities/stams';

import type {
  ActiveStam,
  Flight,
} from '../../types';

type StateProps = {
  implementingStams: Array<ActiveStam>,
  onloadStams: Array<ActiveStam>,
  offloadStams: Array<ActiveStam>,
}

type Filter = 'onload' | 'implementing';
const isFlightOfConcern = (sectors: Sectors, filter: Filter) => (flight: Flight): boolean => {
  let targetSector;
  if(filter === 'onload') {
    targetSector = flight.onloadSector;
  } else {
    targetSector = flight.implementingSector;
  }

  if(!Array.isArray(sectors)) {
    return false;
  }

  return sectors.includes(targetSector);
};

const pruneFlightsFromStam = (sectors: Sectors, filter: Filter) => (stam: ActiveStam): ActiveStam => {
  const { flights } = stam;
  if(!flights) {
    return stam;
  }

  const newFlights = flights.filter(isFlightOfConcern(sectors, filter));
  return {
    ...stam,
    flights: newFlights,
  };
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { sectors } = ownProps;
  const activeStams = getActiveStams(state);


  // At this point we have all active stams
  // We need to filter flights out depending on our status
  const implementingStams = activeStams
    .map(pruneFlightsFromStam(sectors, 'implementing'))
    .filter(stam => stam.flights.length);

  const onloadStams = activeStams
    .map(pruneFlightsFromStam(sectors, 'onload'))
    .filter(stam => stam.flights.length);

  const offloadStams = Array.isArray(sectors) ?
    getActiveStams(state)
      .filter(stam => sectors.includes(stam.offloadSector)) :
    [];

  return {
    implementingStams,
    onloadStams,
    offloadStams,
  };
};

import type { Connector } from 'react-redux';
const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

export default connector(CwpMain);

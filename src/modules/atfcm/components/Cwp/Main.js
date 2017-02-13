/* @flow */
import React from 'react';
import F from 'flexbox-react';

import Implementing from './Implementing';
import ArchiveCard from '../shared/ArchiveCard';

import type { Sectors } from '../../../../core/types';

// Helper component
type RightCellProps = {
  children?: React$Element<any>,
  title?: string | React$Element<any>,
}

const RightCell = ({ children, title }: RightCellProps): React$Element<any> => {
  const titleElement = title ? (
    <h4 style={{margin: 0}}>{title}</h4>
  ) : null;

  return (
    <F
      flexDirection="column"
      flexGrow={1}
      flexBasis={0}
    >
      {titleElement}
      <F
        flexDirection="column"
        flexGrow={1}
        style={{overflowY: 'auto', margin: 0}}
      >
        {children}
      </F>
    </F>
  );
};

type OwnProps = {
  sectors: Sectors,
};

type Props = OwnProps & StateProps;

const columnStyle = {
  padding: 10,
};

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
      allStams,
    } = this.props;

    return (
      <F
        flexDirection="row"
        flexGrow={1}
      >
        <F
          flexDirection="column"
          flexGrow={1}
          flexShrink={0}
          flexBasis={0}
          style={columnStyle}
        >
          <h1>Todo</h1>
          <F
            flexDirection="column"
            flexGrow={1}
            style={{overflowY: 'auto'}}
          >
            <Implementing stams={implementingStams} />
          </F>
        </F>
        <F
          flexDirection="column"
          flexGrow={1}
          flexShrink={0}
          flexBasis={0}
          style={columnStyle}
        >
          <RightCell title="Onload">
            {onloadStams.map(this.renderStam)}
          </RightCell>
          <RightCell title="Offload">
            {offloadStams.map(this.renderStam)}
          </RightCell>
        </F>
        <F
          flexDirection="column"
          flexGrow={1}
          flexShrink={0}
          flexBasis={0}
          style={columnStyle}
        >
          <RightCell title="Hotspots">
            {allStams.map(stam =>
              <ArchiveCard theme="dark" stam={stam} subtitle={null} />
            )}
          </RightCell>
        </F>
      </F>
    );
  }
}

import { connect } from 'react-redux';
import type { RootState, Dispatch } from '../../../../store';
import { getActiveStams, getStams } from '../../reducers/entities/stams';

import type {
  ActiveStam,
  Stam,
  Flight,
} from '../../types';

type StateProps = {
  implementingStams: Array<ActiveStam>,
  onloadStams: Array<ActiveStam>,
  offloadStams: Array<ActiveStam>,
  allStams: Array<Stam>,
};

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
};

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

  const allStams = getStams(state);

  return {
    implementingStams,
    onloadStams,
    offloadStams,
    allStams,
  };
};

import type { Connector } from 'react-redux';
const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

export default connector(CwpMain);

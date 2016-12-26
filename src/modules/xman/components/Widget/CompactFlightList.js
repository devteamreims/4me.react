// @flow
import React from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import { Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';

import Callsign from '../FlightList/Callsign';
import ActionButtons from '../FlightList/ActionButtons';
import Delay from '../FlightList/Delay';

import * as ColorManipulator from 'material-ui/utils/colorManipulator';

import {
  primary1Color,
} from '../../../../shared/theme/colors';

import type { RichFlight } from '../../types/flight';

const highlightedColor = ColorManipulator.fade(primary1Color, 0.2);

const styles = {
  container: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    minHeight: '100%',
  }
};

type Props = {
  isLoading: boolean,
  flights: ?Array<RichFlight>,
};

export const CompactFlightList = ({
  isLoading,
  flights,
}: Props) => {
  if(isLoading) {
    return (
      <div style={styles.container}>
        <CircularProgress />
      </div>
    );
  }

  if(R.isEmpty(flights)) {
    return null;
  }

  return (
    <Table
      selectable={false}
    >
      <TableBody
        displayRowCheckbox={false}
      >
        {R.map(
          (flight: RichFlight) => (
            <TableRow
              selectable={false}
              key={flight.ifplId}
              style={flight.isHighlighted ? {backgroundColor: highlightedColor} : {}}
            >
              <TableRowColumn style={{width: '25%'}}>
                <Callsign
                  callsign={flight.arcid}
                  destination={flight.destination}
                />
              </TableRowColumn>
              <TableRowColumn style={{width: '10%'}}>
                <Delay
                  delay={flight.delay}
                  isTonedDown={false}
                />
              </TableRowColumn>
              <TableRowColumn style={{textAlign: 'right'}}>
                <ActionButtons
                  ifplId={flight.ifplId}
                  isHighlighted={flight.isHighlighted}
                />
              </TableRowColumn>
            </TableRow>
          ),
          flights
        )}
      </TableBody>
    </Table>
  );
};

import {
  getRichFlights,
  isLoading,
} from '../../selectors/flight-list';


const mapStateToProps = state => ({
  flights: getRichFlights(state),
  isLoading: isLoading(state),
}: Props);

export default connect(mapStateToProps)(CompactFlightList);

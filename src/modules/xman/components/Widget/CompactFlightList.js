// @flow
import React from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import { Table, TableBody } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';

import FlightRow from '../FlightList/FlightRow';
import { columnWidths } from '../FlightList/FlightList';

import type { RichFlight } from '../../types/flight';

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
            <FlightRow
              key={flight.ifplId}
              flight={flight}
              isHighlighted={flight.isHighlighted}
              isTonedDown={flight.isTonedDown}
              widths={columnWidths}
            />
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

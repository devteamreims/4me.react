import React, { Component } from 'react';
import { connect } from 'react-redux';

import LinearProgress from 'material-ui/lib/linear-progress';

import FlightRow from './FlightRow';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

const style = {
  table: {
    width: '100%',
    color: '#FFF',
    backgroundColor: 'inherit',
    fontSize: '20px',
  },
  tableHeader: {
    tableRow: {
      borderBottom: '1px solid #666',
      tableHeaderColumn: {
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center',
      },
    },
  },
};

const Loader = (props) => {
  if(props.visible) {
    return (
      <LinearProgress mode="indeterminate" />
    );
  }

  return (<span></span>);
};

const columnWidths = [
  '10%',
  '5%',
  '10%',
  '15%',
  '35%',
  '20%',
];

class FlightList extends Component {
  render() {
    const {
      flights,
      isLoading,
      ...other,
    } = this.props;

    function getStyles(styles, column) {
      return Object.assign({}, styles, {width: columnWidths[column]});
    }

    let i = 0;

    return (
      <div>
        <Table
          style={style.table}
          selectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow style={style.tableHeader.tableRow}>
              <TableHeaderColumn
                style={getStyles(style.tableHeader.tableRow.tableHeaderColumn, i++)}
              >Callsign</TableHeaderColumn>
              <TableHeaderColumn
                style={getStyles(style.tableHeader.tableRow.tableHeaderColumn, i++)}
              >Delay</TableHeaderColumn>
              <TableHeaderColumn
                style={getStyles(style.tableHeader.tableRow.tableHeaderColumn, i++)}
              >FL</TableHeaderColumn>
              <TableHeaderColumn
                style={getStyles(style.tableHeader.tableRow.tableHeaderColumn, i++)}
              >COP</TableHeaderColumn>
              <TableHeaderColumn
                style={getStyles(style.tableHeader.tableRow.tableHeaderColumn, i++)}
              >Speed</TableHeaderColumn>
              <TableHeaderColumn
                style={getStyles(style.tableHeader.tableRow.tableHeaderColumn, i++)
              }>Applied</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody style={style.tableBody}>
            {_.map(flights, (flight, index) =>
              <FlightRow
                key={index}
                flight={flight}
                isHighlighted={flight.isHighlighted}
                isTonedDown={flight.isTonedDown}
                widths={columnWidths}
              />
            )}
          </TableBody>
        </Table>
        <Loader visible={isLoading} />
      </div>
    );
  }
}

import {
  getFlights,
  isLoading,
} from '../../selectors/flight-list';

import {
  isFlightHighlighted,
  isFlightTonedDown,
} from '../../selectors/flight';

const mapStateToProps = (state) => {
  const flights = _.map(getFlights(state), flight => {
    return {
      isHighlighted: isFlightHighlighted(state, flight.ifplId),
      isTonedDown: isFlightTonedDown(state, flight.ifplId),
      ...flight,
    };
  });

  return {
    flights,
    isLoading: isLoading(state),
  };
};

export default connect(mapStateToProps)(FlightList);

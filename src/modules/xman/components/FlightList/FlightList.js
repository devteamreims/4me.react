import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import LinearProgress from 'material-ui/LinearProgress';

import FlightRow from './FlightRow';
import theme from '../../../../shared/theme';

import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableBody
} from 'material-ui/Table';

const style = {
  table: {
    width: '100%',
    color: '#FFF',
    backgroundColor: 'inherit',
    fontSize: '16px',
  },
  tableHeaderColumn: {
    fontSize: 20,
    color: theme.palette.accent1Color,
    textAlign: 'center',
  },
  tableHeader: {
    tableRow: {
      borderBottom: '1px solid #666',
      tableHeaderColumn: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
      },
    },
  },
};

const Loader = (props) => {
  if (props.visible) {
    return (
      <LinearProgress mode="indeterminate" />
    );
  }

  return (<span />);
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
                style={getStyles(style.tableHeaderColumn, i++)}
              >
                Callsign
              </TableHeaderColumn>
              <TableHeaderColumn
                style={getStyles(style.tableHeaderColumn, i++)}
              >
                Delay
              </TableHeaderColumn>
              <TableHeaderColumn
                style={getStyles(style.tableHeaderColumn, i++)}
              >
                FL
              </TableHeaderColumn>
              <TableHeaderColumn
                style={getStyles(style.tableHeaderColumn, i++)}
              >
                COP/TTO
              </TableHeaderColumn>
              <TableHeaderColumn
                style={getStyles(style.tableHeaderColumn, i++)}
              >
                Speed
              </TableHeaderColumn>
              <TableHeaderColumn
                style={getStyles(style.tableHeaderColumn, i++)}
              >
                Applied
              </TableHeaderColumn>
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
  getRichFlights,
  isLoading,
} from '../../selectors/flight-list';

const mapStateToProps = (state) => {
  const flights = getRichFlights(state);

  return {
    flights,
    isLoading: isLoading(state),
  };
};

export default connect(mapStateToProps)(FlightList);

import React, { Component } from 'react';

import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';

import theme from '../../../../theme';

const defaultStyles = {
  table: {
    width: '100%',
    color: '#FFF',
    backgroundColor: 'inherit',
  },
  tableHeader: {},
  tableHeaderRow: {
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  tableHeaderColumn: {
    fontSize: 20,
    color: theme.palette.accent1Color,
  },
  tableBody: {},
  tableBodyRow: {},
  tableBodyColumn: { fontSize: '' },
  selectedBodyRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
};

class PointProfileLegend extends Component {
  render() {
    const {
      style = {},
    } = this.props;

    const styles = Object.assign({}, defaultStyles, style);

    return (
      <div style={styles}>
        <Table
          selectable={false}
          style={styles.table}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow style={styles.tableHeaderRow}>
              <TableHeaderColumn
                style={styles.tableHeaderColumn}
              >
                Estimate
              </TableHeaderColumn>
              <TableHeaderColumn
                style={styles.tableHeaderColumn}
              >
                Point
              </TableHeaderColumn>
              <TableHeaderColumn
                style={styles.tableHeaderColumn}
              >
                Center
              </TableHeaderColumn>
              <TableHeaderColumn
                style={styles.tableHeaderColumn}
              >
                Sector
              </TableHeaderColumn>
              <TableHeaderColumn
                style={styles.tableHeaderColumn}
              >
                FL
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    );
  }
}

export default PointProfileLegend;

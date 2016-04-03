import React, { Component } from 'react';

import _ from 'lodash';
import moment from 'moment';

import Table from 'material-ui/lib/table/table';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

class PointProfile extends Component {


  render() {
    const {
      flight,
    } = this.props;

    return (
      <Table
        selectable={false}
        height="100%"
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Est.</TableHeaderColumn>
            <TableHeaderColumn>Point</TableHeaderColumn>
            <TableHeaderColumn>FL</TableHeaderColumn>
            <TableHeaderColumn>Trend</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {_.map(flight.pointProfile, point =>
            <TableRow>
              <TableRowColumn
              >
                {point.timeOver}
              </TableRowColumn>
              <TableRowColumn>
                {point.name}
              </TableRowColumn>
              <TableRowColumn>
                {point.flightLevel}
              </TableRowColumn>
              <TableRowColumn>
                {point.trend}
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}

PointProfile.PropTypes = {
  flight: React.PropTypes.object.isRequired,
};


export default PointProfile;

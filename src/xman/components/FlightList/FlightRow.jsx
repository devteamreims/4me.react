import React, { Component } from 'react';

import Callsign from './Callsign';
import Delay from './Delay';
import FlightLevel from './FlightLevel';
import Cop from './Cop';
import ActionButtons from './ActionButtons';
import AppliedBy from './AppliedBy';

import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

import ColorManipulator from 'material-ui/lib/utils/color-manipulator';

import {
  faintBlack,
} from 'material-ui/lib/styles/colors';

import {
  primary1Color,
} from '../../../theme/colors';


const highlightedColor = ColorManipulator.fade(primary1Color, 0.2);
const tonedDownColor = faintBlack;

class FlightRow extends Component {
  render() {
    const {
      flight,
      isHighlighted,
      isTonedDown,
      widths,
      ...other,
    } = this.props;

    const {
      isForcedOff = false,
      isForcedMcs = false,
    } = flight;

    console.log(flight);

    const style = {
      tableRowColumn: {
        fontSize: 18,
        textAlign: 'center',
      },
      tableRow: {
        height: 100,
      },
    };

    let i = 0;

    if(isHighlighted) {
      Object.assign(style.tableRow, {backgroundColor: highlightedColor});
    }

    if(isTonedDown) {
      Object.assign(style.tableRow, {color: tonedDownColor});
    }

    function getStyles(styles, column) {
      return Object.assign({}, styles, {width: widths[column]});
    }

    let copOverrideText;

    if(isForcedOff) {
      copOverrideText = 'XMAN OFF';
    } else if(isForcedMcs) {
      copOverrideText = 'FORCE MCS';
    }

    return (
      <TableRow
        style={style.tableRow}
      >
        <TableRowColumn style={getStyles(style.tableRowColumn, i++)}>
          <Callsign
            callsign={flight.arcid}
            destination={flight.destination}
          />
        </TableRowColumn>
        <TableRowColumn style={getStyles(style.tableRowColumn, i++)}>
          <Delay
            delay={flight.delay}
            isTonedDown={isTonedDown}
          />
        </TableRowColumn>
        <TableRowColumn style={getStyles(style.tableRowColumn, i++)}>
          <FlightLevel
            currentFlightLevel={flight.position.vertical.currentFlightLevel}
          />
        </TableRowColumn>
        <TableRowColumn style={getStyles(style.tableRowColumn, i++)}>
          <Cop
            name={flight.cop}
            targetTime={flight.advisory.targetTime}
            estimatedTime={flight.advisory.estimatedTime}
            overrideText={copOverrideText}
          />
        </TableRowColumn>
        <TableRowColumn style={getStyles(style.tableRowColumn, i++)}>
          <ActionButtons
            ifplId={flight.ifplId}
            isHighlighted={isHighlighted}
            isTonedDown={isTonedDown}
          />
        </TableRowColumn>
        <TableRowColumn style={getStyles(style.tableRowColumn, i++)}>
          <AppliedBy
            ifplId={flight.ifplId}
          />
        </TableRowColumn>
      </TableRow>
    );
  }
}

FlightRow.PropTypes = {
  flight: React.PropTypes.object.isRequired,
  isHighlighted: React.PropTypes.bool,
  isTonedDown: React.PropTypes.bool,
};

export default FlightRow;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';
import moment from 'moment';
import R from 'ramda';

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import theme from '../../../../theme';

import PointProfileLegend from './PointProfileLegend';
import ColoredFlightLevel from './ColoredFlightLevel';
import ColorizedContent from '../../../../shared/components/ColorizedContent';

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

class PointProfile extends Component {
  constructor(props) {
    super(props);

    const pointProfile = _.get(props, 'pointProfile', []);

    this.state = this._processIndex(pointProfile);
    this.refreshInterval = null;
    this._rowRef = [];
  }

  componentDidMount() {
    const interval = 20 * 1000;

    // First, set scroll to proper position
    const {
      scrollIndex,
    } = this.state;

    const ref = this._rowRef[scrollIndex];

    const el = ReactDOM.findDOMNode(ref);

    if(el) {
      el.scrollIntoView();
    }

    // Then, make the highlight bar progress as the flight moves
    this.refreshInterval = setInterval(() => {
      const {pointProfile} = this.props;

      const newState = this._processIndex(pointProfile);
      this.setState(newState);

      const {highlightIndex} = newState;
      const maxIndex = this.props.pointProfile.length - 1;
      if(highlightIndex === maxIndex) {
        clearInterval(this.refreshInterval);
      }
    }, interval);
  }

  componentWillUnmount() {
    if(this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  _processIndex = (pointProfile) => {
    const timeOverSort = (point) => {
      const timestamp = new Date(point.timeOver);
      return timestamp;
    };

    let highlightIndex = _.sortedIndexBy(pointProfile, {timeOver: Date.now()}, timeOverSort) - 1;

    // Highlight the last row
    if(highlightIndex < 0) {
      highlightIndex = 0;
    }

    let scrollIndex = highlightIndex - 2;
    if(scrollIndex < 0) {
      scrollIndex = 0;
    }

    return {
      highlightIndex,
      scrollIndex,
    };
  };

  render() {
    const {
      pointProfile,
      style = {},
    } = this.props;

    const {
      highlightIndex,
    } = this.state;

    const styles = Object.assign({}, defaultStyles, style);

    return (
      <div
        style={{
          display: 'flex',
          flexGrow: '1',
          flexShrink: '1',
          flexDirection: 'column',
        }}
      >
        <PointProfileLegend />
        <Table
          selectable={false}
          style={styles.table}
        >
          <TableBody
            displayRowCheckbox={false}
            style={styles.tableBody}
          >
            {_.map(pointProfile, (point, index) => {
              const center = R.pathOr('XXXX', ['airspace', 'center'], point);
              const sector = R.pathOr('XXXX', ['airspace', 'name'], point);

              return (
                <TableRow
                  key={index}
                  ref={
                    ref => {
                      this._rowRef[index] = ref;
                    }
                  }
                  style={index === highlightIndex ?
                    Object.assign({}, styles.tableBodyRow, styles.selectedBodyRow) :
                    styles.tableBodyRow
                  }
                >
                  <TableRowColumn
                    style={styles.tableBodyColumn}
                  >
                    {moment.utc(point.timeOver).format('HH:mm')}
                  </TableRowColumn>
                  <TableRowColumn
                    style={styles.tableBodyColumn}
                  >
                    {point.name}
                  </TableRowColumn>
                  <TableRowColumn
                    style={styles.tableBodyColumn}
                  >
                    <ColorizedContent hash={center}>
                      {center}
                    </ColorizedContent>
                  </TableRowColumn>
                  <TableRowColumn
                    style={styles.tableBodyColumn}
                  >
                    <ColorizedContent hash={sector}>
                      {sector}
                    </ColorizedContent>
                  </TableRowColumn>
                  <TableRowColumn
                    style={styles.tableBodyColumn}
                  >
                    <ColoredFlightLevel flightLevel={point.flightLevel} />
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

PointProfile.propTypes = {
  pointProfile: React.PropTypes.object.isRequired,
};


export default PointProfile;

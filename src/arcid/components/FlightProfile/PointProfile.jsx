import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';
import moment from 'moment';

import shallowCompare from 'react-addons-shallow-compare';

import Table from 'material-ui/lib/table/table';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';


import theme from '../../../theme';

import PointProfileLegend from './PointProfileLegend';
import ColoredFlightLevel from './ColoredFlightLevel';
import Trend from './Trend';

const defaultStyles = {
  table: {
    width: '100%',
    color: '#FFF',
    backgroundColor: 'inherit',
  },
  tableHeader: {},
  tableHeaderRow: {
    //backgroundColor: 'rgba(255, 255, 255, 0.1)',
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

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    const interval = 20*1000;

    // First, set scroll to proper position
    const {
      scrollIndex,
    } = this.state;

    const ref = this.refs[`PointProfile-${scrollIndex}`];

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
    this.refreshInterval && clearInterval(this.refreshInterval);
  }

  render() {
    const {
      pointProfile,
      style = {},
    } = this.props;

    const {
      highlightIndex,
      scrollIndex,
    } = this.state;

    const styles = Object.assign({}, defaultStyles, style);

    let previousTrend;

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
              const showTrend = previousTrend !== point.trend || point.trend !== 'CRUISE';
              previousTrend = point.trend;

              return (
                <TableRow
                  key={index}
                  ref={`PointProfile-${index}`}
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
                    {_.get(point, 'airspace.center', 'XXXX')}
                  </TableRowColumn>
                  <TableRowColumn
                    style={styles.tableBodyColumn}
                  >
                    <ColoredFlightLevel flightLevel={point.flightLevel} />
                  </TableRowColumn>
                  <TableRowColumn
                    style={styles.tableBodyColumn}
                  >
                    {showTrend && <Trend trend={point.trend} />}
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

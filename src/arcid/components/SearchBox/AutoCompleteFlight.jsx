import React, { Component } from 'react';

import _ from 'lodash';
import moment from 'moment';

import {ListItem} from 'material-ui/List';
import Highlighter from 'react-highlighter';

import theme from '../../../theme';

const style = {
  container: {
    paddingTop: '5px',
    paddingBottom: '5px',
    lineHeight: '20px',
  },
  callsign: {
    margin: 0,
  },
  depDest: {
    fontSize: 16,
  },
  EOBT: {
    color: '#AAA',
  },
};

class AutoCompleteFlight extends Component {
  static muiName = 'MenuItem';

  render() {
    const {
      callsign,
      searchString,
      departure,
      destination,
      eobt,
    } = this.props;

    const formattedEobt = moment.utc(eobt).format('YYYY-MM-DD HH:mm');

    return (
      <div style={style.container}>
        <h3 style={style.callsign}>
          <Highlighter
            search={searchString}
            matchElement="span"
            matchStyle={{color: theme.palette.accent1Color}}
          >
            {_.toUpper(callsign)}
          </Highlighter>
        </h3>
        <span style={style.depDest}>{departure} -> {destination}</span><br />
        <span style={style.EOBT}>EOBT : {formattedEobt}</span>
      </div>
    );
  }
}


AutoCompleteFlight.propTypes = {
  searchString: React.PropTypes.string,
  callsign: React.PropTypes.string.isRequired,
  departure: React.PropTypes.string.isRequired,
  destination: React.PropTypes.string.isRequired,
  eobt: React.PropTypes.number.isRequired,
};

export default AutoCompleteFlight;

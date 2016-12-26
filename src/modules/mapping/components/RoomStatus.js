// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {mapping as mappingConfig} from '../../../config';

import Paper from 'material-ui/Paper';
import EmergencyFrequency from './EmergencyFrequency';

class RoomStatus extends Component {

  shouldDisplayEmergencyFrequencies() {
    return !_.get(mappingConfig, 'disableEmergencyRadios', false);
  }

  render() {
    const {
      openedCwpCount,
      style = {},
      ...other
    } = this.props;

    const defaultStyle = {paddingLeft: 20, paddingRight: 20, textAlign: 'center'};
    const newStyle = Object.assign({}, defaultStyle, style);

    return (
      <Paper style={newStyle} {...other}>
        <h1>{openedCwpCount}</h1>
        {this.shouldDisplayEmergencyFrequencies() &&
          <p><EmergencyFrequency /></p>
        }
      </Paper>
    );
  }
}


import {
  getOpenedCwpCount,
} from '../selectors/map';

const mapStateToProps = (state) => {
  const openedCwpCount = getOpenedCwpCount(state);

  return {
    openedCwpCount,
  };
};

export default connect(mapStateToProps)(RoomStatus);

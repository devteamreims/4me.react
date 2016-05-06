import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import Paper from 'material-ui/lib/paper';


class StatusMessage extends Component {

  render() {
    const {
      messages,
      status,
      ...other
    } = this.props;

    const inside = _.map(messages, message => {
      return (
        <h3 style={{margin: 0}}>{message}</h3>
      );
    });

    return (
      <Paper
        zDepth={0}
        rounded={false}
        {...other}
      >
        {inside}
      </Paper>
    );
  }
}

import {
  getStatus,
  getMessages,
} from '../selectors/status';

const mapStateToProps = (state) => {
  const status = getStatus(state);
  const messages = getMessages(state);

  return {
    messages,
    status,
    statusLevel: _.get(status, 'status'),
  };
};

export default connect(mapStateToProps)(StatusMessage);

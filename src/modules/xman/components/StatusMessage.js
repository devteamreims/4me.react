import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import Paper from 'material-ui/Paper';

class StatusMessage extends Component {
  render() {
    const {
      messages,
      style,
    } = this.props;

    const inside = _.map(messages, (message, index) =>
      <h3 key={index} style={{margin: 0}}>{message}</h3>
    );

    return (
      <Paper
        zDepth={0}
        rounded={false}
        style={style}
      >
        {inside}
      </Paper>
    );
  }
}

import {
  getMessages,
} from '../selectors/status';

const mapStateToProps = (state) => {
  const messages = getMessages(state);

  return {
    messages,
  };
};

export default connect(mapStateToProps)(StatusMessage);

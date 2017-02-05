// @flow
import React, { Component } from 'react';

import moment from 'moment';

import LinearProgress from 'material-ui/LinearProgress';
import Divider from 'material-ui/Divider';
import * as Colors from 'material-ui/styles/colors';

type Props = {
  buffer: number,
  sendTime: ?Date,
  color?: string,
};

export class Progress extends Component {
  props: Props;
  refreshInterval: *;

  static defaultProps = {
    buffer: 60,
  };

  componentDidMount() {
    this.refreshInterval = setInterval(() => {
      this.forceUpdate();
    }, 16);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  render() {
    const {
      buffer,
      sendTime,
      color,
    } = this.props;

    if(!sendTime) {
      return <Divider />;
    }

    const difference = moment(sendTime).diff(moment(), 'seconds');

    if(difference <= 0 || difference > buffer) {
      return <Divider />;
    }

    return (
      <LinearProgress
        mode="determinate"
        color={color || Colors.cyan200}
        value={moment().valueOf()}
        min={moment(sendTime).subtract(buffer, 'seconds').valueOf()}
        max={moment(sendTime).valueOf()}
      />
    );
  }
}

export default Progress;

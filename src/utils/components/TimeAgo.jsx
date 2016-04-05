import React, { Component } from 'react';

import moment from 'moment';

class TimeAgo extends Component {

  constructor(props) {
    super(props);

    this.refreshInterval = null;
  }

  componentDidMount() {
    const interval = 15000;

    this.refreshInterval = setInterval(() => {
      this.forceUpdate();
    }, interval);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  render() {
    const {
      when,
    } = this.props;

    const formattedTime = moment(when).fromNow();

    return (
      <span>{formattedTime}</span>
    );
  }
}

TimeAgo.PropTypes = {
  when: React.PropTypes.number.isRequired,
};

export default TimeAgo;

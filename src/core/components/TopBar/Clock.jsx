import React, { Component } from 'react';
import moment from 'moment';


class Clock extends Component {
  constructor(props) {
    super(props);

    this.refreshHandler = null;
    this.refreshInterval = 100;
  }

  componentDidMount() {
    this.refreshHandler = setInterval(this.forceUpdate.bind(this), this.refreshInterval);
  }

  componentWillUnmount() {
    clearInterval(this.refreshHandler);
  }

  render() {
    const {
      ...other,
    } = this.props;
    const time = moment.utc().format('DD/MM HH:mm:ss');
    return <span {...other} >{time}</span>
  }
}

export default Clock;

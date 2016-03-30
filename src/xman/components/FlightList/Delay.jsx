import React, { Component } from 'react';


class Delay extends Component {
  render() {
    return (
      <span>{this.props.delay || 0}</span>
    );
  }
}

Delay.PropTypes = {
  delay: React.PropTypes.number
};

export default Delay;

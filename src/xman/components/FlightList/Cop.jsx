import React, { Component } from 'react';

class Cop extends Component {
  render() {
    return (
      <span>{this.props.name}</span>
    );
  }
}

Cop.PropTypes = {
  name: React.PropTypes.string.isRequired,
  targetTime: React.PropTypes.instanceOf(Date),
  estimatedTime: React.PropTypes.instanceOf(Date),
};

export default Cop;

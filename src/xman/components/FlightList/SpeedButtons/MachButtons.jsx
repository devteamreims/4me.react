import React, { Component } from 'react';
import { connect } from 'react-redux';

class MachButtons extends Component {
  render() {
    return (
      <span>Mach buttons for {this.props.ifplId}</span>
    );
  }
}

MachButtons.PropTypes = {
  ifplId: React.PropTypes.string.isRequired,
}

import {
  getFlightByIfplId,
} from '../../../selectors/flight-list';

const mapStateToProps = (state, ownProps) => {

  const {
    ifplId,
  } = ownProps;

  const flight = getFlightByIfplId(state, ifplId);

  return {
    flight,
  };
};

export default connect(mapStateToProps)(MachButtons);

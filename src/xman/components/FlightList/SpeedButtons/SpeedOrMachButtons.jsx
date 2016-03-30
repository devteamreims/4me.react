import React, { Component } from 'react';
import { connect } from 'react-redux';

import MachButtons from './MachButtons';

class SpeedOrMachButtons extends Component {
  render() {
    const {
      ifplId,
      isSpeedMode,
      isMachMode,
      ...other,
    } = this.props;

    if(isMachMode) {
      return (
        <MachButtons ifplId={ifplId} {...other} />
      );
    } else if(isSpeedMode) {
      return (
        <span>Speed buttons ! {ifplId}</span>
      );
    }


    // This should never happen
    return (
      <span>Woops !</span>
    );
  }
}

SpeedOrMachButtons.PropTypes = {
  ifplId: React.PropTypes.string.isRequired,
};


import {
  getFlightByIfplId,
} from '../../../selectors/flight-list';

import {
  isFlightInSpeedMode,
  isFlightInMachMode,
} from '../../../selectors/flight';

const mapStateToProps = (state, ownProps) => {

  const {
    ifplId,
  } = ownProps;

  const flight = getFlightByIfplId(state, ifplId);

  return {
    flight,
    isSpeedMode: isFlightInSpeedMode(state, ifplId),
    isMachMode: isFlightInMachMode(state, ifplId),
  };
};

export default connect(mapStateToProps)(SpeedOrMachButtons);

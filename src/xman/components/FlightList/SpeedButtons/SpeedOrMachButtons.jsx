import React, { Component } from 'react';
import { connect } from 'react-redux';

import MachButtons from './MachButtons';
import SpeedButtons from './SpeedButtons';

import PureRenderMixin from 'react-addons-pure-render-mixin';


class SpeedOrMachButtons extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {
      ifplId,
      isSpeedMode,
      isMachMode,
    } = this.props;

    if(isMachMode) {
      return (
        <MachButtons ifplId={ifplId} />
      );
    } else if(isSpeedMode) {
      return (
        <SpeedButtons ifplId={ifplId} />
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
  isFlightInSpeedMode,
  isFlightInMachMode,
} from '../../../selectors/flight';

const mapStateToProps = (state, ownProps) => {
  const {
    ifplId,
  } = ownProps;

  return {
    isSpeedMode: isFlightInSpeedMode(state, ifplId),
    isMachMode: isFlightInMachMode(state, ifplId),
  };
};

export default connect(mapStateToProps)(SpeedOrMachButtons);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import R from 'ramda';

import './buttons.scss';

import McsModeButtons from './McsModeButtons';
import MachModeButtons from './MachModeButtons';

class ActionButtons extends Component {
  render() {
    const {
      ifplId,
      isSpeedMode,
      isMachMode,
      isMcsMode,
      sectors,
      isHighlighted,
      isTonedDown,
    } = this.props;

    const dimmed = !isHighlighted || isTonedDown;

    const readOnly = R.isEmpty(sectors);

    if(isMcsMode) {
      return (
        <McsModeButtons
          ifplId={ifplId}
          dimmed={dimmed}
          readOnly={readOnly}
        />
      );
    } else if(isMachMode) {
      return (
        <MachModeButtons
          ifplId={ifplId}
          dimmed={dimmed}
          readOnly={readOnly}
        />
      );
    } else if(isSpeedMode) {
      return (
        <span>Speed mode !</span>
      );
    }

    return (
      <span>Should never happen</span>
    );
  }
}

ActionButtons.propTypes = {
  ifplId: React.PropTypes.string.isRequired,
  isHighlighted: React.PropTypes.bool,
};

import {
  isFlightInSpeedMode,
  isFlightInMachMode,
  isFlightInMcsMode,
  getMinimumCleanSpeed,
  hasSetAction,
} from '../../../selectors/flight';

const mapStateToProps = (state, ownProps) => {
  const {
    ifplId,
  } = ownProps;

  return {
    isSpeedMode: isFlightInSpeedMode(state, ifplId),
    isMachMode: isFlightInMachMode(state, ifplId),
    isMcsMode: isFlightInMcsMode(state, ifplId),
    minimumCleanSpeed: getMinimumCleanSpeed(state, ifplId),
    isUndoButtonDisabled: !hasSetAction(state, ifplId),
  };
};

import withSectors from '../../../../core/wrappers/withSectors';

export default R.pipe(
  withSectors,
  connect(mapStateToProps),
)(ActionButtons);

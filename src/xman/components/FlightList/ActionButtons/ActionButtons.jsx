import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pure } from 'recompose';
import _ from 'lodash';

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
      readOnly,
      isHighlighted,
      isTonedDown,
    } = this.props;

    const dimmed = !isHighlighted || isTonedDown;

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

import {
  getSectors,
} from '../../../../core/selectors/sector';

const mapStateToProps = (state, ownProps) => {
  const {
    ifplId,
  } = ownProps;

  return {
    isSpeedMode: isFlightInSpeedMode(state, ifplId),
    isMachMode: isFlightInMachMode(state, ifplId),
    isMcsMode: isFlightInMcsMode(state, ifplId),
    minimumCleanSpeed: getMinimumCleanSpeed(state, ifplId),
    readOnly: _.isEmpty(getSectors(state)),
    isUndoButtonDisabled: !hasSetAction(state, ifplId),
  };
};


export default connect(mapStateToProps)(pure(ActionButtons));

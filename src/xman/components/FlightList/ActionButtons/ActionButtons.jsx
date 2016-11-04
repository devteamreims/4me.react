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
      client,
      sectors,
      isHighlighted,
      isTonedDown,
    } = this.props;

    const dimmed = !isHighlighted || isTonedDown;

    const readOnly = R.isEmpty(sectors);

    const author = {
      sectors,
      cwp: {
        id: client.id || null,
        name: client.name || 'P__',
      },
    };

    if(isMcsMode) {
      return (
        <McsModeButtons
          ifplId={ifplId}
          dimmed={dimmed}
          readOnly={readOnly}
          author={author}
        />
      );
    } else if(isMachMode) {
      return (
        <MachModeButtons
          ifplId={ifplId}
          dimmed={dimmed}
          readOnly={readOnly}
          author={author}
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

import { injectOrganProps } from '../../../../core/wrappers/injectOrganProps';

export default R.pipe(
  injectOrganProps,
  connect(mapStateToProps),
)(ActionButtons);

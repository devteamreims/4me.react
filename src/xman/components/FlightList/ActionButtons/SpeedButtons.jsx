import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import RaisedButton from 'material-ui/lib/raised-button';

const possibleSpeeds = [280, 270, 260, 250, 240];

function getBackgroundColor() {}

import UndoButton from './UndoButton';
import SpeedMachButton from './SpeedMachButton';
import McsButton from './McsButton';

class SpeedButtons extends Component {

  handleUndo = (event) => {
    const {
      undoAction,
      disableActions,
    } = this.props;

    if(disableActions) {
      return;
    }

    undoAction();
  };

  handleMcs = (event) => {
    const {
      minimumCleanSpeed,
      setMcs,
      disableActions,
    } = this.props;

    if(disableActions) {
      return;
    }

    setMcs(!minimumCleanSpeed);
  };

  handleSetSpeed = (speed) => (event) => {
    const {
      setSpeed,
      disableActions,
    } = this.props;

    if(disableActions) {
      return;
    }

    setSpeed(speed);
  };

  render() {
    const {
      advisedSpeed,
      appliedSpeed,
      minimumCleanSpeed,
      areButtonsDisabled,
      isUndoButtonDisabled,
      disableActions,
    } = this.props;

    function getXmanState(speed) {
      let xmanState = 'empty';

      if(speed === appliedSpeed) {
        return 'selected';
      }

      if(speed === advisedSpeed) {
        const isSoft = minimumCleanSpeed || (appliedSpeed && advisedSpeed >= appliedSpeed);

        return isSoft ? 'advisedSoft' : 'advised';
      }
    }

    const buttonStyles = {
      fontWeight: 'inherit',
    };

    return (
      <span>
        {_.map(possibleSpeeds, (speed, index) =>
          <SpeedMachButton
            key={index}
            label={`${speed}`}
            xmanState={getXmanState(speed)}
            disabled={areButtonsDisabled}
            style={buttonStyles}
            onClick={this.handleSetSpeed(speed)}
          />
        )}
        <McsButton
          disabled={areButtonsDisabled}
          selected={minimumCleanSpeed}
          style={buttonStyles}
          onClick={this.handleMcs}
        />
        {!disableActions &&
          <UndoButton
            disabled={isUndoButtonDisabled}
            style={buttonStyles}
            onClick={isUndoButtonDisabled ? () => {} : this.handleUndo}
          />
        }
      </span>
    );
  }
}

SpeedButtons.propTypes = {
  ifplId: React.PropTypes.string.isRequired,
  disableActions: React.PropTypes.bool,
}

import {
  getFlightByIfplId,
} from '../../../selectors/flight-list';

import {
  getAdvisedSpeed,
  getAppliedSpeed,
  getMinimumCleanSpeed,
} from '../../../selectors/flight';

const mapStateToProps = (state, ownProps) => {

  const {
    ifplId,
  } = ownProps;

  const flight = getFlightByIfplId(state, ifplId);
  const advisedSpeed = getAdvisedSpeed(state, ifplId);
  const appliedSpeed = getAppliedSpeed(state, ifplId);
  const minimumCleanSpeed = getMinimumCleanSpeed(state, ifplId);

  const areButtonsDisabled = !advisedSpeed && !appliedSpeed;
  const isUndoButtonDisabled = areButtonsDisabled || !(minimumCleanSpeed || appliedSpeed);

  return {
    advisedSpeed,
    appliedSpeed,
    minimumCleanSpeed,
    areButtonsDisabled,
    isUndoButtonDisabled,
  };
};

import {
  setSpeed,
  setMcs,
  clearAction,
} from '../../../actions/flight';

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    ifplId,
  } = ownProps;

  return {
    undoAction: () => dispatch(clearAction(ifplId, {})),
    setSpeed: (speed) => dispatch(setSpeed(ifplId, speed)),
    setMcs: (mcs) => dispatch(setMcs(ifplId, mcs)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeedButtons);

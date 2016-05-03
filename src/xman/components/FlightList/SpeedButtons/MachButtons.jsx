import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import RaisedButton from 'material-ui/lib/raised-button';

const possibleMachs = [0, 1, 2, 3, 4];

function getBackgroundColor() {}

import UndoButton from './UndoButton';
import SpeedMachButton from './SpeedMachButton';
import McsButton from './McsButton';

class MachButtons extends Component {

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

  handleSetMach = (mach) => (event) => {
    const {
      setMach,
      disableActions,
    } = this.props;

    if(disableActions) {
      return;
    }

    setMach(mach);
  };

  render() {
    const {
      advisedMach,
      appliedMach,
      minimumCleanSpeed,
      areButtonsDisabled,
      isUndoButtonDisabled,
      disableActions,
      dimmed = false,
    } = this.props;

    function getXmanState(mach) {
      let xmanState = 'empty';

      if(mach === appliedMach) {
        return 'selected';
      }

      if(mach === advisedMach) {
        const isSoft = minimumCleanSpeed || appliedMach >= advisedMach;

        return isSoft ? 'advisedSoft' : 'advised';
      }

      return xmanState;
    }

    const buttonStyles = {
      fontWeight: 'inherit',
    };

    return (
      <span>
        {_.map(possibleMachs, (mach, index) =>
          <SpeedMachButton
            key={index}
            label={`${mach}`}
            xmanState={getXmanState(mach)}
            disabled={areButtonsDisabled}
            style={buttonStyles}
            dimmed={dimmed}
            onClick={this.handleSetMach(mach)}
          />
        )}
        <McsButton
          disabled={areButtonsDisabled}
          selected={minimumCleanSpeed}
          style={buttonStyles}
          onClick={this.handleMcs}
          dimmed={dimmed}
        />
        {!disableActions &&
          <UndoButton
            disabled={isUndoButtonDisabled}
            style={buttonStyles}
            onClick={isUndoButtonDisabled ? () => {} : this.handleUndo}
            dimmed={dimmed}
          />
        }
      </span>
    );
  }
}

MachButtons.PropTypes = {
  ifplId: React.PropTypes.string.isRequired,
  disableActions: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
}

import {
  getFlightByIfplId,
} from '../../../selectors/flight-list';

import {
  getAdvisedMach,
  getAppliedMach,
  getMinimumCleanSpeed,
} from '../../../selectors/flight';

const mapStateToProps = (state, ownProps) => {

  const {
    ifplId,
  } = ownProps;

  const flight = getFlightByIfplId(state, ifplId);
  const advisedMach = getAdvisedMach(state, ifplId);
  const appliedMach = getAppliedMach(state, ifplId);
  const minimumCleanSpeed = getMinimumCleanSpeed(state, ifplId);

  const areButtonsDisabled = !advisedMach && !appliedMach;
  const isUndoButtonDisabled = areButtonsDisabled || !(minimumCleanSpeed || appliedMach);

  return {
    advisedMach,
    appliedMach,
    minimumCleanSpeed,
    areButtonsDisabled,
    isUndoButtonDisabled,
  };
};

import {
  setMach,
  setMcs,
  clearAction,
} from '../../../actions/flight';

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    ifplId,
  } = ownProps;

  return {
    undoAction: () => dispatch(clearAction(ifplId, {})),
    setMach: (mach) => dispatch(setMach(ifplId, mach)),
    setMcs: (mcs) => dispatch(setMcs(ifplId, mcs)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MachButtons);

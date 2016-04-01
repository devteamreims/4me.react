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
    } = this.props;

    undoAction();
  };

  handleMcs = (event) => {
    const {
      minimumCleanSpeed,
      setMcs,
    } = this.props;

    setMcs(!minimumCleanSpeed);
  };

  handleSetMach = (mach) => (event) => {
    const {
      setMach,
    } = this.props;

    setMach(mach);
  };

  render() {
    const {
      advisedMach,
      appliedMach,
      minimumCleanSpeed,
      areButtonsDisabled,
      isUndoButtonDisabled,
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
            onClick={this.handleSetMach(mach)}
          />
        )}
        <McsButton
          disabled={areButtonsDisabled}
          selected={minimumCleanSpeed}
          style={buttonStyles}
          onClick={this.handleMcs}
        />
        <UndoButton
          disabled={isUndoButtonDisabled}
          style={buttonStyles}
          onClick={isUndoButtonDisabled ? () => {} : this.handleUndo}
        />
      </span>
    );
  }
}

MachButtons.PropTypes = {
  ifplId: React.PropTypes.string.isRequired,
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

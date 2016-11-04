import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import R from 'ramda';

import McsButton from './McsButton';
import UndoButton from './UndoButton';
import SpeedMachButton from './SpeedMachButton';

const possibleMachs = [0, 1, 2, 3, 4];

class MachModeButtons extends Component {
  handleMcs = (event) => { // eslint-disable-line no-unused-vars
    const {
      readOnly,
      setMcs,
      minimumCleanSpeed,
    } = this.props;

    if(readOnly) {
      return;
    }

    setMcs(!minimumCleanSpeed);
  };

  handleMach = (mach) => (event) => { // eslint-disable-line no-unused-vars
    const {
      readOnly,
      setMach,
    } = this.props;

    if(readOnly) {
      return;
    }

    setMach(mach);
  };

  handleUndo = (event) => { // eslint-disable-line no-unused-vars
    const {
      readOnly,
      clearAction,
    } = this.props;

    if(readOnly) {
      return;
    }

    clearAction();
  };

  render() {
    const {
      disabled,
      minimumCleanSpeed,
      readOnly,
      dimmed,
      ifplId,
      appliedMach,
      advisedMach,
    } = this.props;

    function getXmanState(mach) {
      if(mach === appliedMach) {
        return 'selected';
      }

      if(mach === advisedMach) {
        const isSoft = dimmed;

        return isSoft ? 'advisedSoft' : 'advised';
      }

      return 'empty';
    }

    return (
      <div className="xman-buttons">
        {_.map(possibleMachs, (mach, index) =>
          <SpeedMachButton
            key={index}
            label={`${mach}`}
            xmanState={getXmanState(mach)}
            disabled={disabled && mach !== appliedMach}
            onClick={this.handleMach(mach)}
            dimmed={dimmed}
          />
        )}
        <McsButton
          disabled={disabled}
          selected={minimumCleanSpeed}
          onClick={this.handleMcs}
          dimmed={dimmed}
        />
        {!readOnly &&
          <UndoButton
            ifplId={ifplId}
            dimmed={dimmed}
            readOnly={readOnly}
            onClick={this.handleUndo}
          />
        }
      </div>
    );
  }
}

import {
  getMinimumCleanSpeed,
  getAppliedMach,
  getAdvisedMach,
} from '../../../selectors/flight';

const mapStateToProps = (state, ownProps) => {
  const {
    ifplId,
  } = ownProps;

  const appliedMach = getAppliedMach(state, ifplId);
  const advisedMach = getAdvisedMach(state, ifplId);

  return {
    minimumCleanSpeed: getMinimumCleanSpeed(state, ifplId),
    appliedMach,
    advisedMach,
    disabled: advisedMach === 0 || advisedMach === null,
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
    author,
  } = ownProps;

  return {
    clearAction: () => dispatch(clearAction(ifplId, author)),
    setMcs: (mcs) => dispatch(setMcs(ifplId, mcs, author)),
    setMach: (mach) => dispatch(setMach(ifplId, mach, author)),
  };
};

import withClient from '../../../../core/wrappers/withClient';
import withSectors from '../../../../core/wrappers/withSectors';

export default R.compose(
  withClient,
  withSectors,
  connect(mapStateToProps, mapDispatchToProps)
)(MachModeButtons);

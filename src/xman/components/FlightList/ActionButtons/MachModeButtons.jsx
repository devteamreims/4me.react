import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

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

  render() {
    const {
      disabled,
      minimumCleanSpeed,
      readOnly,
      dimmed,
      ifplId,
      appliedMach,
      advisedMach,
      ...other
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
            {...other}
          />
        )}
        <McsButton
          disabled={disabled}
          selected={minimumCleanSpeed}
          onClick={this.handleMcs}
          dimmed={dimmed}
          {...other}
        />
        {!readOnly &&
          <UndoButton
            ifplId={ifplId}
            dimmed={dimmed}
            readOnly={readOnly}
            {...other}
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
  } = ownProps;

  return {
    clearAction: () => dispatch(clearAction(ifplId, {})),
    setMcs: (mcs) => dispatch(setMcs(ifplId, mcs)),
    setMach: (mach) => dispatch(setMach(ifplId, mach)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MachModeButtons);

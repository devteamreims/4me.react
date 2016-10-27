import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import McsButton from './McsButton';
import UndoButton from './UndoButton';
import SpeedMachButton from './SpeedMachButton';

const possibleSpeeds = [280, 270, 260, 250, 240];

class SpeedModeButtons extends Component {

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

  handleSpeed = (speed) => (event) => { // eslint-disable-line no-unused-vars
    const {
      readOnly,
      setSpeed,
    } = this.props;

    if(readOnly) {
      return;
    }

    setSpeed(speed);
  };

  render() {
    const {
      disabled,
      minimumCleanSpeed,
      readOnly,
      dimmed,
      ifplId,
      appliedSpeed,
      advisedSpeed,
      ...other
    } = this.props;

    function getXmanState(speed) {
      if(speed === appliedSpeed) {
        return 'selected';
      }

      if(speed === advisedSpeed) {
        const isSoft = minimumCleanSpeed || appliedSpeed >= advisedSpeed;

        return isSoft ? 'advisedSoft' : 'advised';
      }

      return 'empty';
    }

    return (
      <div className="xman-buttons">
        {_.map(possibleSpeeds, (speed, index) =>
          <SpeedMachButton
            key={index}
            label={`${speed}`}
            xmanState={getXmanState(speed)}
            disabled={disabled}
            onClick={this.handleSpeed(speed)}
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
  getAppliedSpeed,
  getAdvisedSpeed,
} from '../../../selectors/flight';

const mapStateToProps = (state, ownProps) => {
  const {
    ifplId,
  } = ownProps;

  const appliedSpeed = getAppliedSpeed(state, ifplId);
  const advisedSpeed = getAdvisedSpeed(state, ifplId);

  return {
    minimumCleanSpeed: getMinimumCleanSpeed(state, ifplId),
    appliedSpeed,
    advisedSpeed,
    disabled: advisedSpeed === null,
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
    clearAction: () => dispatch(clearAction(ifplId, {})),
    setMcs: (mcs) => dispatch(setMcs(ifplId, mcs)),
    setSpeed: (speed) => dispatch(setSpeed(ifplId, speed)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SpeedModeButtons);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import McsButton from './McsButton';
import UndoButton from './UndoButton';

class McsModeButtons extends Component {

  handleMcs = (event) => {
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

  render() {
    const {
      disabled,
      minimumCleanSpeed,
      readOnly,
      dimmed,
      ifplId,
      ...other
    } = this.props;

    return (
      <div className="xman-buttons">
        <McsButton
          disabled={disabled}
          selected={minimumCleanSpeed}
          onClick={this.handleMcs}
          dimmed={dimmed}
          advised={true}
          icon={false}
          label="MCS"
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
} from '../../../selectors/flight';

const mapStateToProps = (state, ownProps) => {
  const {
    ifplId,
  } = ownProps;

  return {
    minimumCleanSpeed: getMinimumCleanSpeed(state, ifplId),
  };
};

import {
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
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(McsModeButtons);

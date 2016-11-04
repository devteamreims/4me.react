import React, { Component } from 'react';
import { connect } from 'react-redux';

import McsButton from './McsButton';
import UndoButton from './UndoButton';

class McsModeButtons extends Component {

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

  handleUndo = event => { // eslint-disable-line no-unused-vars
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
    author,
  } = ownProps;

  return {
    clearAction: () => dispatch(clearAction(ifplId, author)),
    setMcs: (mcs) => dispatch(setMcs(ifplId, mcs, author)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(McsModeButtons);

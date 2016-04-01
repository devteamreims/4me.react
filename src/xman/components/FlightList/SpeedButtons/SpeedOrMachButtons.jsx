import React, { Component } from 'react';
import { connect } from 'react-redux';

import MachButtons from './MachButtons';
import SpeedButtons from './SpeedButtons';

import PureRenderMixin from 'react-addons-pure-render-mixin';

import './buttons.scss';

class SpeedOrMachButtons extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {
      ifplId,
      isSpeedMode,
      isMachMode,
      disableActions,
    } = this.props;

    if(isMachMode) {
      return (
        <div className="xman-buttons">
          <MachButtons
            ifplId={ifplId}
            disableActions={disableActions}
          />
        </div>
      );
    } else if(isSpeedMode) {
      return (
        <div className="xman-buttons">
          <SpeedButtons
            ifplId={ifplId}
            disableActions={disableActions}
          />
        </div>
      );
    }


    // This should never happen
    return (
      <span>Woops !</span>
    );
  }
}

SpeedOrMachButtons.PropTypes = {
  ifplId: React.PropTypes.string.isRequired,
};

import {
  isFlightInSpeedMode,
  isFlightInMachMode,
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
    disableActions: _.isEmpty(getSectors(state)),
  };
};

export default connect(mapStateToProps)(SpeedOrMachButtons);

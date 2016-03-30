import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExtendedControls from './ExtendedControls';

import Checkbox from 'material-ui/lib/checkbox';

class FlightListControls extends Component {

  togglePendingAction = (ev, value) => {
    const {
      isPendingActionFilterEnabled,
    } = this.props;
    if(value !== isPendingActionFilterEnabled) {
      return this.props.togglePendingAction();
    }
  }

  render() {
    const {
      isPendingActionFilterEnabled,
      showExtendedControls,
      ...other,
    } = this.props;

    return (
      <div>
        <Checkbox
          label="Highlight pending actions"
          checked={isPendingActionFilterEnabled}
          onCheck={this.togglePendingAction}
        />
        {showExtendedControls && <ExtendedControls />}
      </div>
    );
  }
}

import {
  isPendingActionFilterEnabled,
} from '../../selectors/highlighter';

import {
  shouldShowFilters,
} from '../../selectors/list-filter';

import {
  togglePendingAction,
} from '../../actions/highlighter';

const mapStateToProps = (state) => {
  return {
    showExtendedControls: shouldShowFilters(state),
    isPendingActionFilterEnabled: isPendingActionFilterEnabled(state),
  };
};

const mapDispatchToProps = {
  togglePendingAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightListControls);

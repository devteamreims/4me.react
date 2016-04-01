import React, { Component } from 'react';
import { connect } from 'react-redux';

import VerticalControl from './VerticalControl';
import GeographicalControl from './GeographicalControl';

import Checkbox from 'material-ui/lib/checkbox';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '100%',
    justifyContent: 'space-between',
    margin: 10,
  },
  element: {
    display: 'inline',
    flexGrow: '0',
  },
};

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
      <div style={style.container}>
        <Checkbox
          label="Highlight pending actions"
          checked={isPendingActionFilterEnabled}
          onCheck={this.togglePendingAction}
          style={style.element}
        />
        {showExtendedControls &&
          <GeographicalControl
            style={style.element}
          />
        }
        {showExtendedControls &&
          <VerticalControl
            style={style.element}
          />
        }
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

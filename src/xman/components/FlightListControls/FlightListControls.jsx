import React, { Component } from 'react';
import { connect } from 'react-redux';

import VerticalControl from './VerticalControl';
import GeographicalControl from './GeographicalControl';

import Checkbox from 'material-ui/lib/checkbox';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  element: {
    display: 'inline',
    flexGrow: '0',
  },
};

class FlightListControls extends Component {

  render() {
    const {
      isPendingActionFilterEnabled,
      showExtendedControls,
      ...other,
    } = this.props;

    return (
      <div style={style.container}>
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
  shouldShowFilters,
} from '../../selectors/list-filter';


const mapStateToProps = (state) => {
  return {
    showExtendedControls: shouldShowFilters(state),
  };
};

const mapDispatchToProps = {
  togglePendingAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightListControls);

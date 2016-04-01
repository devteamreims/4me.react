import React, { Component } from 'react';
import { connect } from 'react-redux';

import Checkbox from 'material-ui/lib/checkbox';

class VerticalControl extends Component {

  toggleVerticalFilter = (ev, value) => {
    const {
      isVerticalFilterEnabled,
    } = this.props;
    if(value !== isVerticalFilterEnabled) {
      return this.props.toggleVerticalFilter();
    }
  };

  render() {
    const {
      isVerticalFilterEnabled,
      isGeographicalFilterEnabled,
      ...other,
    } = this.props;

    return (
      <Checkbox
        key="vertical-filter"
        label="Vertical filter"
        checked={isVerticalFilterEnabled}
        disabled={!isGeographicalFilterEnabled}
        onCheck={this.toggleVerticalFilter}
        {...other}
      />
    );
  }
}



import {
  isVerticalFilterEnabled,
  isGeographicalFilterEnabled,
} from '../../selectors/list-filter';

import {
  toggleVerticalFilter,
} from '../../actions/list-filter';


const mapStateToProps = (state) => {
  return {
    isVerticalFilterEnabled: isVerticalFilterEnabled(state),
    isGeographicalFilterEnabled: isGeographicalFilterEnabled(state),
  };
};

const mapDispatchToProps = {
  toggleVerticalFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalControl);

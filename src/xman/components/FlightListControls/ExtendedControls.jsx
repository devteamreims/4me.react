import React, { Component } from 'react';
import { connect } from 'react-redux';

import Checkbox from 'material-ui/lib/checkbox';

class ExtendedControls extends Component {

  toggleVerticalFilter = (ev, value) => {
    const {
      isVerticalFilterEnabled,
    } = this.props;
    if(value !== isVerticalFilterEnabled) {
      return this.props.toggleVerticalFilter();
    }
  };

  toggleGeographicalFilter = (ev, value) => {
    const {
      isGeographicalFilterEnabled,
    } = this.props;
    if(value !== isGeographicalFilterEnabled) {
      return this.props.toggleGeographicalFilter();
    }
  };

  render() {
    const {
      isGeographicalFilterEnabled,
      isVerticalFilterEnabled,
      prettySectors,
      ...other,
    } = this.props;

    return (
      <div>
        <Checkbox
          key="geographical-filter"
          label={`Geographical filter (${prettySectors})`}
          checked={isGeographicalFilterEnabled}
          onCheck={this.toggleGeographicalFilter}
        />
        <Checkbox
          key="vertical-filter"
          label="Vertical filter"
          checked={isVerticalFilterEnabled}
          disabled={!isGeographicalFilterEnabled}
          onCheck={this.toggleVerticalFilter}
        />
      </div>
    );
  }
}

import {
  isVerticalFilterEnabled,
  isGeographicalFilterEnabled,
} from '../../selectors/list-filter';

import {
  toggleVerticalFilter,
  toggleGeographicalFilter,
} from '../../actions/list-filter';

import {
  getPrettySectors,
} from '../../../core/selectors/sector';

const mapStateToProps = (state) => {
  return {
    isVerticalFilterEnabled: isVerticalFilterEnabled(state),
    isGeographicalFilterEnabled: isGeographicalFilterEnabled(state),
    prettySectors: getPrettySectors(state),
  };
};

const mapDispatchToProps = {
  toggleVerticalFilter,
  toggleGeographicalFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtendedControls);

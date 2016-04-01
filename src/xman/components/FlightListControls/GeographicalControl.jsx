import React, { Component } from 'react';
import { connect } from 'react-redux';

import Checkbox from 'material-ui/lib/checkbox';

class GeographicalControl extends Component {

  toggleGeographicalFilter = (ev, value) => {
    const {
      isGeographicalFilterEnabled,
      toggleGeographicalFilter,
    } = this.props;

    if(value !== isGeographicalFilterEnabled) {
      return toggleGeographicalFilter();
    }
  };

  render() {
    const {
      prettySectors,
      isGeographicalFilterEnabled,
      ...other,
    } = this.props;

    return (
      <Checkbox
        key="geographical-filter"
        label={`Geographical filter (${prettySectors})`}
        checked={isGeographicalFilterEnabled}
        onCheck={this.toggleGeographicalFilter}
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
  getPrettySectors,
} from '../../../core/selectors/sector';

const mapStateToProps = (state) => {
  return {
    isVerticalFilterEnabled: isVerticalFilterEnabled(state),
    isGeographicalFilterEnabled: isGeographicalFilterEnabled(state),
    prettySectors: getPrettySectors(state),
  };
};

import {
  toggleGeographicalFilter,
} from '../../actions/list-filter';

const mapDispatchToProps = {
  toggleGeographicalFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeographicalControl);

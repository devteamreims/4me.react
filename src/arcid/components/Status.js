import React, {Component} from 'react';
import {connect} from 'react-redux';

import SingleStatus from '../../core/components/Status/SingleStatus';

class Status extends Component {
  render() {
    const {
      displayLevel,
      items,
      status,
    } = this.props;

    return (
      <SingleStatus
        title="ETFMS PROFILE"
        level={status}
        items={items}
        displayLevel={displayLevel}
      />
    );
  }
}

import {
  getStatus,
} from '../selectors/status';

const mapStateToProps = state => {
  const { items, status } = getStatus(state);

  return {
    items,
    status,
  };
};

export default connect(mapStateToProps)(Status);

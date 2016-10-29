import React, { Component } from 'react';
import { connect } from 'react-redux';

import R from 'ramda';

import SingleStatus from './SingleStatus';

const style = {
  margin: 30,
  color: '#FFF',
};

export class GlobalStatus extends Component {
  render() {
    const {
      coreStatus,
      displayLevel,
      organComponents,
    } = this.props;

    return (
      <div style={style}>
        <h3>Version {process.env.VERSION}</h3>
        <SingleStatus
          key="core"
          title={coreStatus.name}
          level={coreStatus.status}
          items={coreStatus.items}
          displayLevel={displayLevel}
        />
        {R.addIndex(R.map)((Component, key) => <Component key={key} displayLevel={displayLevel} />, organComponents)}
      </div>
    );
  }
}


import {
  getCoreStatus,
  getDisplayLevel,
} from '../../selectors/status';

const mapStateToProps = (state) => {
  const coreStatus = getCoreStatus(state);

  return {
    coreStatus,
    displayLevel: 'extended' || getDisplayLevel(state),
  };
};

export default connect(mapStateToProps)(GlobalStatus);

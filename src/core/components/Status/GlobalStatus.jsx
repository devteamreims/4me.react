import React, { Component } from 'react';

import { connect } from 'react-redux';

import SingleStatus from './SingleStatus';

const style = {
  margin: 30,
  color: '#FFF',
};

export class GlobalStatus extends Component {
  render() {
    const {
      coreStatus,
      organStatuses,
      displayLevel,
    } = this.props;

    console.log(organStatuses);

    return (
      <div style={style}>
        <SingleStatus
          key="core"
          title={coreStatus.name}
          level={coreStatus.status}
          items={coreStatus.items}
          displayLevel={displayLevel}
        />
        {_.map(organStatuses, (organStatus, index) =>
          <SingleStatus
            key={index}
            title={organStatus.name}
            level={organStatus.status}
            items={organStatus.items}
            displayLevel={displayLevel}
          />
        )}
      </div>
    );
  }
}


import organs from '../../../organs';

import {
  getCoreStatus,
  getDisplayLevel,
} from '../../selectors/status';

const mapStateToProps = (state) => {

  const coreStatus = getCoreStatus(state);

  const organStatuses = _.map(organs, organ => {
    const status = organ.getStatus(state);
    const name = organ.name;

    return {
      name,
      ...status,
    };
  });

  return {
    coreStatus,
    organStatuses,
    displayLevel: getDisplayLevel(state),
  };
}

export default connect(mapStateToProps)(GlobalStatus);

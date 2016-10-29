import React, {Component} from 'react';

import SingleStatus from '../../core/components/Status/SingleStatus';

class Status extends Component {
  render() {
    const {
      displayLevel,
    } = this.props;

    return (
      <SingleStatus
        title="Example component"
        status="warning"
        items={[]}
        displayLevel={displayLevel}
      />
    );
  }
}


export default Status;

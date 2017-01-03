// @flow
import React, {Component} from 'react';

import SingleStatus from '../../../shared/components/status/SingleStatus';

import type { StatusLevel, StatusDisplayLevel } from '../../../shared/types/status';

class Status extends Component {
  props: {
    displayLevel: StatusDisplayLevel,
    status: StatusLevel,
  };

  render() {
    const {
      displayLevel,
      status = 'normal',
    } = this.props;

    return (
      <SingleStatus
        title="ATFCM"
        level={status}
        items={[]}
        displayLevel={displayLevel}
      />
    );
  }
}

export default Status;

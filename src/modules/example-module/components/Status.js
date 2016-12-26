// @flow
import React, {Component} from 'react';

import { connect } from 'react-redux';

import SingleStatus from '../../../core/components/Status/SingleStatus';

import type { StatusLevel, StatusDisplayLevel } from '../../../core/types';

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
        title="Example component"
        level={status}
        items={[]}
        displayLevel={displayLevel}
      />
    );
  }
}

import { getStatusString } from '../index';

const mapStateToProps = state => ({
  status: getStatusString(state),
});

export default connect(mapStateToProps)(Status);

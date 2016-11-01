import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleStatus from './SingleStatus';

const style = {
  margin: 30,
  color: '#FFF',
};

import { isModuleDisabled } from '../../../fmeModules';

import * as ExampleModule from '../../../example-module';
import * as MappingModule from '../../../mapping';
import * as XmanModule from '../../../xman';
import * as EtfmsProfileModule from '../../../arcid';

const getStatusComponent = ({Status, name}) => {
  if(!Status || isModuleDisabled(name)) {
    return () => null;
  }
  return Status;
};

export class GlobalStatus extends Component {
  render() {
    const {
      coreStatus,
      displayLevel,
    } = this.props;

    const MappingStatus = getStatusComponent(MappingModule);
    const ExampleModuleStatus = getStatusComponent(ExampleModule);
    const XmanModuleStatus = getStatusComponent(XmanModule);
    const EtfmsProfileModuleStatus = getStatusComponent(EtfmsProfileModule);

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
        <MappingStatus />
        <ExampleModuleStatus />
        <XmanModuleStatus />
        <EtfmsProfileModuleStatus />
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

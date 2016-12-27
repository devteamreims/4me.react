import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleStatus from '../../../shared/components/status/SingleStatus';

const style = {
  margin: 30,
  color: '#FFF',
};

import { isModuleDisabled } from '../../../shared/utils/modules';

import * as ExampleModule from '../../../modules/example-module';
import * as MappingModule from '../../../modules/mapping';
import * as XmanModule from '../../../modules/xman';
import * as EtfmsProfileModule from '../../../modules/etfms-profile';

const getStatusComponent = ({Status, name}) => {
  if(!Status || isModuleDisabled(name)) {
    return () => null;
  }
  return Status;
};

export class GlobalStatus extends Component {
  constructor(props) {
    super(props);

    this._organs = {
      XmanModuleComponent: getStatusComponent(XmanModule),
      ExampleModuleComponent: getStatusComponent(ExampleModule),
      EtfmsProfileModuleComponent: getStatusComponent(EtfmsProfileModule),
      MappingModuleComponent: getStatusComponent(MappingModule),
    };
  }
  render() {
    const {
      coreStatus,
      displayLevel,
    } = this.props;

    const {
      XmanModuleComponent,
      ExampleModuleComponent,
      EtfmsProfileModuleComponent,
      MappingModuleComponent,
    } = this._organs;

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
        <XmanModuleComponent />
        <ExampleModuleComponent />
        <MappingModuleComponent />
        <EtfmsProfileModuleComponent />
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

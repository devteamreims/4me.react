import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import { Link } from 'react-router';

import * as ExampleModule from '../../../modules/example-module';
import * as MappingModule from '../../../modules/mapping';
import * as XmanModule from '../../../modules/xman';
import * as EtfmsProfileModule from '../../../modules/etfms-profile';
import * as AtfcmModule from '../../../modules/atfcm';

import { injectOrganProps } from '../../wrappers/injectOrganProps';
import { isModuleDisabled } from '../../../shared/utils/modules';

class WithLink extends Component {
  render() {
    const {
      pathName,
    } = this.props;

    return (
      <Link
        to={pathName}
        key={pathName}
        style={{textDecoration: 'none'}}
        children={this.props.children}
      />
    );
  }
}

const getLeftMenuComponent = ({MenuButton, name}) => {
  if(!MenuButton || isModuleDisabled(name)) {
    return () => null;
  }
  return injectOrganProps(MenuButton);
};

class LeftMenu extends Component {
  constructor(props) {
    super(props);

    this._organs = {
      XmanModuleComponent: getLeftMenuComponent(XmanModule),
      ExampleModuleComponent: getLeftMenuComponent(ExampleModule),
      EtfmsProfileModuleComponent: getLeftMenuComponent(EtfmsProfileModule),
      MappingModuleComponent: getLeftMenuComponent(MappingModule),
      AtfcmModuleComponent: getLeftMenuComponent(AtfcmModule),
    };
  }

  render() {
    const {
      XmanModuleComponent,
      ExampleModuleComponent,
      EtfmsProfileModuleComponent,
      MappingModuleComponent,
      AtfcmModuleComponent,
    } = this._organs;

    return (
      <Paper
        zDepth={3}
      >
        <WithLink
          key="xman"
          pathName={XmanModule.uri}
        >
          <XmanModuleComponent />
        </WithLink>
        <WithLink
          key="exampleModule"
          pathName={ExampleModule.uri}
        >
          <ExampleModuleComponent />
        </WithLink>
        <WithLink
          key="controlRoom"
          pathName={MappingModule.uri}
        >
          <MappingModuleComponent />
        </WithLink>
        <WithLink
          key="etfmsProfile"
          pathName={EtfmsProfileModule.uri}
        >
          <EtfmsProfileModuleComponent />
        </WithLink>
        <WithLink
          key="atfcm"
          pathName={AtfcmModule.uri}
        >
          <AtfcmModuleComponent />
        </WithLink>
      </Paper>
    );
  }
}

export default LeftMenu;

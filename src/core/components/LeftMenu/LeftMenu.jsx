import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import R from 'ramda';
import { Link } from 'react-router';

import * as ExampleModule from '../../../example-module';
import * as MappingModule from '../../../mapping';
import * as XmanModule from '../../../xman';
import * as EtfmsProfileModule from '../../../arcid';

import { injectOrganProps } from '../../wrappers/injectOrganProps';
import { isModuleDisabled } from '../../../fmeModules';

// This HOC will wrap a component with a Link and forward two additional props :
// isActive (bool), which will be true when the route is currently active
// transition (fn), which is a callback to transition to the route
const injectLinkTo = (pathName) => DecoratedComponent => {
  const wrappedComponent = (props) => (
    <Link
      to={pathName}
      key={pathName}
      children={
        ({isActive, transition}) => (
          <DecoratedComponent
            {...{isActive, transition, pathName}}
            {...props}
          />
        )
      }
    />
  );
  wrappedComponent.displayName = `injectLinkTo(${pathName})`;

  return wrappedComponent;
};

// Wrap our component with :
// * Props from the store (clients + sectors)
// * Link to pathName
const getMenuButtonComponent = ({uri, MenuButton, name}) => {
  if(!MenuButton || isModuleDisabled(name)) {
    return () => null;
  }

  return R.compose(
    injectLinkTo(uri),
    injectOrganProps,
  )(MenuButton);
};

class LeftMenu extends Component {
  render() {
    const ExampleModuleButton = getMenuButtonComponent(ExampleModule);
    const MappingModuleButton = getMenuButtonComponent(MappingModule);
    const XmanModuleButton = getMenuButtonComponent(XmanModule);
    const EtfmsProfileModuleButton = getMenuButtonComponent(EtfmsProfileModule);

    return (
      <Paper
        zDepth={3}
      >
        <ExampleModuleButton />
        <XmanModuleButton />
        <MappingModuleButton />
        <EtfmsProfileModuleButton />
      </Paper>
    );
  }
}

export default LeftMenu;

// @flow
import React, {Component} from 'react';

import ModuleMenuButton from '../../../shared/components/MenuButton';

export class MenuButton extends Component {
  props: {
    isActive: boolean,
    transition: () => void,
    client: any,
    sectors: any,
  };

  render() {
    const {
      isActive,
      transition,
      client, // eslint-disable-line no-unused-vars
      sectors = [], // eslint-disable-line no-unused-vars
    } = this.props;

    const buttonProps = {
      isActive,
      transition,
      title: 'ATFCM',
    };


    return (
      <ModuleMenuButton {...buttonProps} />
    );
  }
}

export default MenuButton;

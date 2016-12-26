// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';

import ModuleMenuButton from '../../../shared/components/MenuButton';

export class MenuButton extends Component {
  props: {
    isActive: boolean,
    transition: () => void,
    client: any,
    sectors: any,
    counter: number,
  };

  render() {
    const {
      isActive,
      transition,
      client, // eslint-disable-line no-unused-vars
      sectors = [], // eslint-disable-line no-unused-vars
      counter,
    } = this.props;

    const getPriority = (count: number) => {
      if(count < 3) {
        return 'low';
      } else if(count < 5) {
        return 'info';
      } else if(count < 8) {
        return 'warning';
      }

      return 'critical';
    };

    const buttonProps = {
      isActive,
      transition,
      title: 'EXAMPLE MODULE',
      notifications: {count: counter, priority: getPriority(counter)},
    };


    return (
      <ModuleMenuButton {...buttonProps} />
    );
  }
}

import { p } from '../selectors';

const mapStateToProps = (state) => {
  const ourState = p(state);

  const props: {counter: number} = {
    counter: ourState.counter,
  };

  return props;
};

export default connect(mapStateToProps)(MenuButton);

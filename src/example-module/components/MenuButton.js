import React, {Component} from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import {
  OrganButton,
} from '../../core/components/LeftMenu';

export class MenuButton extends Component {
  render() {
    const {
      isActive,
      transition,
      client, // eslint-disable-line no-unused-vars
      sectors = [], // eslint-disable-line no-unused-vars
      counter,
    } = this.props;

    const getPriority = count => {
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
      <OrganButton {...buttonProps} />
    );
  }
}

import { p } from '../selectors';

const mapStateToProps = (state) => {
  const ourState = p(state);

  return {
    counter: R.prop('counter', ourState),
  };
};

export default connect(mapStateToProps)(MenuButton);

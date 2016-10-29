import React, {Component} from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import {
  OrganButton,
} from '../../core/components/LeftMenu';

export class MenuButton extends Component {
  componentDidMount() {
    console.log('Mounted !');
  }

  componentWillUnmount() {
    console.log('Cleanup');
  }

  render() {
    const {
      isActive,
      transition,
      client, // eslint-disable-line no-unused-vars
      sectors = [],
      counter,
    } = this.props;

    const buttonProps = {
      isActive,
      transition,
      title: `MODULE ${counter}`,
      notifications: {count: counter},
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

import React, {Component} from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import {
  OrganButton,
} from '../../core/components/LeftMenu';

export class MenuButton extends Component {
  componentDidMount() {
    const {
      bootstrap,
    } = this.props;

    bootstrap();
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
      totalSectors,
    } = this.props;


    const secondary = `${totalSectors}`;


    return (
      <OrganButton
        isActive={isActive}
        transition={transition}
        title="CONTROL ROOM"
        secondary={secondary}
      />
    );
  }
}

import { bootstrap } from '../actions/bootstrap';

import { getOpenedCwpCount } from '../selectors/map';

const mapStateToProps = state => ({
  totalSectors: getOpenedCwpCount(state),
});

const mapDispatchToProps = {
  bootstrap,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);

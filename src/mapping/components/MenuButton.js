import React, {Component} from 'react';
import {connect} from 'react-redux';


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
    const {
      cleanUp,
    } = this.props;

    cleanUp();
  }

  render() {
    const {
      isActive,
      transition,
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

import {
  bootstrap,
  cleanUp,
} from '../actions/bootstrap';

import { getOpenedCwpCount } from '../selectors/map';

const mapStateToProps = state => ({
  totalSectors: getOpenedCwpCount(state),
});

const mapDispatchToProps = {
  bootstrap,
  cleanUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);

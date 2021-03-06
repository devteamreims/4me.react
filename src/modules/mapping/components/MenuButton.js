// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';


import ModuleMenuButton from '../../../shared/components/MenuButton';

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


    return (
      <ModuleMenuButton
        isActive={isActive}
        transition={transition}
        title="CONTROL ROOM"
        notifications={{count: totalSectors, priority: 'low'}}
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

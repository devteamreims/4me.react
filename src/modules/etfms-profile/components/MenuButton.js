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
    } = this.props;


    return (
      <ModuleMenuButton
        isActive={isActive}
        transition={transition}
        title="ETFMS PROFILE"
      />
    );
  }
}

import {
  bootstrap,
  cleanUp,
} from '../actions/bootstrap';


const mapDispatchToProps = {
  bootstrap,
  cleanUp,
};

export default connect(null, mapDispatchToProps)(MenuButton);

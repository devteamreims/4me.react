// @flow
import React, { Component } from 'react';


import ErrorModal from '../../shared/components/ErrorModal';

class LoadingScreen extends Component {
  render() {
    const {
      children = 'Loading ...',
      title = 'Loading ...',
      actions,
    } = this.props;

    return (
      <ErrorModal
        title={title}
        actions={actions}
      >
        {children}
      </ErrorModal>
    );
  }
}


export default LoadingScreen;

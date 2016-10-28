import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class InteractionCatcher extends Component {
  handleUserInteraction = _.debounce(ev => { // eslint-disable-line no-unused-vars
    const {
      interact,
    } = this.props;

    console.log('Interaction caught !');
    interact();
  }, 100);

  render() {
    const {
      children = null,
      interact,
      ...rest
    } = this.props;

    return (
      <div
        onClick={this.handleUserInteraction}
        onMouseDown={this.handleUserInteraction}
        onKeyDown={this.handleUserInteraction}
        onWheel={this.handleUserInteraction}
        {...rest}
      >
        {children}
      </div>
    );
  }
}

import {
  interact,
} from '../actions/returnToDashboard';

export default connect(null, {interact})(InteractionCatcher);

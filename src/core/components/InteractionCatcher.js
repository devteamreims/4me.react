import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class InteractionCatcher extends Component {
  handleUserInteraction = _.throttle(ev => { // eslint-disable-line no-unused-vars
    const {
      interact,
    } = this.props;

    interact();
  }, 1000);

  render() {
    const {
      children = null,
      interact, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    return (
      <div
        onClick={this.handleUserInteraction}
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

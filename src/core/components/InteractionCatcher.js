// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { throttle } from 'lodash';

class InteractionCatcher extends Component {
  props: {
    children: ?React.Element<*>,
    interact: Function,
  };

  handleUserInteraction = throttle(ev => { // eslint-disable-line no-unused-vars
    const {
      interact,
    } = this.props;

    interact();
  }, 1000);

  render() {
    const {
      children,
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

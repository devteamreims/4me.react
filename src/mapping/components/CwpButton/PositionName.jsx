// @flow
import _ from 'lodash';
import React, { Component } from 'react';

class PositionName extends Component {
  render() {
    const style = {
      display: 'block',
      fontSize: '14px',
      ..._.pick(this.context.muiTheme.raisedButton, ['color', 'fontWeight']),
      fontWeight: 400,
    };

    return (
      <span style={Object.assign(style, this.props.style)}>{_.toUpper(this.props.name) || '...'}</span>
    );
  }
}

PositionName.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default PositionName;

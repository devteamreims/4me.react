import _ from 'lodash';
import React, { Component } from 'react';

class PositionSectors extends Component {
  render() {
    const style = {
      display: 'block',
      fontSize: '18px',
      fontWeight: 500,
      ..._.pick(this.context.muiTheme.raisedButton, ['color']),
    };

    return (
      <span style={Object.assign(style, this.props.style)}>
        {this.props.sectorName}
      </span>
    );
  }
}

PositionSectors.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default PositionSectors;

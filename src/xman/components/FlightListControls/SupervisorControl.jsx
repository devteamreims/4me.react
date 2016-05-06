import React, { Component } from 'react';

import Toggle from 'material-ui/lib/toggle';

const FETCHERS = ['EGLL', 'LSZH'];

const toggleStyle = {
  display: 'inline',
};

class SupervisorControl extends Component {

  render() {
    const {
      style,
    } = this.props;

    return (
      <div style={style} >
        {_.map(FETCHERS, (f, key) => [
          <Toggle
            label={`${f} MCS`}
            labelPosition="right"
            style={toggleStyle}
            key={`MCS-${key}`}
          />,
          <Toggle
            label={`${f} OFF`}
            labelPosition="right"
            style={toggleStyle}
            key={`OFF-${key}`}
          />
        ])}
      </div>
    );
  }
}


export default SupervisorControl;

import React, { Component } from 'react';

import _ from 'lodash';

import Toggle from 'material-ui/Toggle';


const toggleStyle = {
  display: 'inline',
};

class SupervisorControl extends Component {

  handleForceMcs = (fetcher) => (event, value) => {
    const {
      handleForceMcs,
    } = this.props;

    return handleForceMcs(fetcher, event, value);
  };

  handleForceOff = (fetcher) => (event, value) => {
    const {
      handleForceOff,
    } = this.props;

    // Invert value, since our toggled in active when XMAN is ON
    // and not when it is forced off
    return handleForceOff(fetcher, event, !value);
  };

  render() {
    const {
      style,
      fetchers,
    } = this.props;

    return (
      <div style={style}>
        {_.map(fetchers, (value, fetcher) => [
          <Toggle
            label={`${fetcher} MCS`}
            labelPosition="right"
            style={toggleStyle}
            key={`MCS-${fetcher}`}
            onToggle={this.handleForceMcs(fetcher)}
            disabled={_.get(value, 'forceOff', false)}
            toggled={_.get(value, 'forceMcs', false)}
          />,
          <Toggle
            label={`${fetcher} ON/OFF`}
            labelPosition="right"
            style={toggleStyle}
            key={`OFF-${fetcher}`}
            onToggle={this.handleForceOff(fetcher)}
            toggled={!_.get(value, 'forceOff', false)}
          />,
        ])}
      </div>
    );
  }
}

SupervisorControl.propTypes = {
  style: React.PropTypes.object,
  fetchers: React.PropTypes.object,
  handleForceOff: React.PropTypes.func,
  handleForceMcs: React.PropTypes.func,
};

SupervisorControl.defaultProps = {
  handleForceOff: () => {},
  handleForceMcs: () => {},
  fetchers: {},
};

export default SupervisorControl;

import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';

class CwpEnabler extends Component {
  render() {
    const {
      onStatusChange,
      isEnabled,
    } = this.props;

    return (
      <Toggle
        label="CWP Enabled"
        onToggle={onStatusChange}
        defaultToggled={isEnabled}
        labelPosition="right"
      />
    );
  }
}

CwpEnabler.propTypes = {
  isEnabled: React.PropTypes.bool.isRequired,
  onStatusChange: React.PropTypes.func.isRequired,
};

CwpEnabler.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default CwpEnabler;

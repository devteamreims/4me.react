import React, { Component } from 'react';
import _ from 'lodash';

import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

class CwpEnabler extends Component {
  render() {
    const {
      onStatusChange,
      isEnabled,
    } = this.props;

    return (
      <div>
        <h2>Disabled CWP</h2>
        <RadioButtonGroup
          defaultSelected={isEnabled ? 'enabled' : 'disabled'}
          onChange={onStatusChange}
        >
          <RadioButton
            value="enabled"
            label="Enabled"
          />
          <RadioButton
            value="disabled"
            label="Disabled"
          />
        </RadioButtonGroup>
      </div>
    );
  }
}

CwpEnabler.PropTypes = {
  isEnabled: React.PropTypes.bool.isRequired,
  onStatusChange: React.PropTypes.func.isRequired,
};

export default CwpEnabler;

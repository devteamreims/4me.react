import React, { Component } from 'react';
import _ from 'lodash';

import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import Toggle from 'material-ui/lib/toggle';

const style = {
  group: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    //marginBottom: '30px',
    marginTop: '30px',
  },
  button: {
    width: 'auto',
    flexGrow: '0',
    flexShrink: '0',
    marginLeft: 50,
  },
};

class CwpEnabler extends Component {
  render() {
    const {
      onStatusChange,
      isEnabled,
    } = this.props;

    return (
      <div>
        <Toggle
          label="CWP Enabled"
          onToggle={onStatusChange}
          defaultToggled={isEnabled}
          labelPosition="right"
        />
      </div>
    );
  }
}

CwpEnabler.PropTypes = {
  isEnabled: React.PropTypes.bool.isRequired,
  onStatusChange: React.PropTypes.func.isRequired,
};

export default CwpEnabler;

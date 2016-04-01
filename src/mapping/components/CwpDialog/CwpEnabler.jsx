import React, { Component } from 'react';
import _ from 'lodash';

import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

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
        <RadioButtonGroup
          defaultSelected={isEnabled ? 'enabled' : 'disabled'}
          onChange={onStatusChange}
          style={style.group}
        >
          <RadioButton
            value="enabled"
            label="Enabled"
            style={style.button}
          />
          <RadioButton
            value="disabled"
            label="Disabled"
            style={style.button}
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

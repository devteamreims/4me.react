import React, { Component } from 'react';

import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

class FilterControl extends Component {

  render() {
    const {
      style,
      selected,
      onChange,
      disabled = false,
    } = this.props;

    const buttonStyle = {
      display: 'inline',
      width: 'auto',
      flexGrow: '1',
    };

    return (
      <RadioButtonGroup
        style={style}
        name="filter_control"
        onChange={onChange}
        valueSelected={selected}
      >
        <RadioButton
          value="all"
          label="All flights"
          style={buttonStyle}
          disabled={disabled}
        />
        <RadioButton
          value="geographical"
          label="Geo filter"
          style={buttonStyle}
          disabled={disabled}
        />
        <RadioButton
          value="vertical"
          label="Geo + Vertical"
          style={buttonStyle}
          disabled={disabled}
        />
      </RadioButtonGroup>
    );
  }
}

FilterControl.PropTypes = {
  style: React.PropTypes.object,
  selected: React.PropTypes.oneOf(['all', 'geographical', 'vertical']).isRequired,
  onChange: React.PropTypes.func,
  disabled: React.PropTypes.bool,
};

export default FilterControl;

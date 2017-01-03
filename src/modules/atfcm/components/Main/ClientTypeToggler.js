// @flow
import React, { Component } from 'react';

import {
  RadioButton,
  RadioButtonGroup,
} from 'material-ui/RadioButton';

import type { ClientType } from '../../../../core/types';


type Props = {
  onChange: (*, ClientType) => void,
  defaultSelected: ClientType,
};


class ClientTypeToggler extends Component {
  props: Props;

  render() {
    const {
      onChange,
      defaultSelected,
    } = this.props;

    const buttonStyle = {
      display: 'inline',
      width: 'auto',
      flexGrow: '1',
    };

    return (
      <RadioButtonGroup
        onChange={onChange}
        defaultSelected={defaultSelected}
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 5,
          borderBottom: '1px solid white',
        }}
      >
        <RadioButton
          value="cwp"
          label="CWP"
          style={buttonStyle}
        />
        <RadioButton
          value="fmp"
          label="FMP"
          style={buttonStyle}
        />
        <RadioButton
          value="spvr"
          label="SUPERVISOR"
          style={buttonStyle}
        />
      </RadioButtonGroup>
    );
  }
}

export default ClientTypeToggler;

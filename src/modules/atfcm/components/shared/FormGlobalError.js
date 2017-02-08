// @flow
import React, { Component } from 'react';
import { red500 } from 'material-ui/styles/colors';

type Props = {
  error?: ?string,
  style?: ?Object,
};

class FormGlobalError extends Component {
  render() {
    const {
      error,
      style = {},
    } = this.props;

    if(!error) {
      return null;
    }

    const defaultStyle = {
      marginTop: 10,
      color: red500,
    };


    return (
      <div
        style={{
          ...defaultStyle,
          ...style,
        }}
      >
        {error}
      </div>
    );
  }
}

export default FormGlobalError;

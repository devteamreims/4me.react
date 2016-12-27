import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

const defaultStyle = {
  minWidth: 0,
  width: 60,
};

import { pure } from 'recompose';

class XmanButton extends Component {
  render() {
    const {
      style: propsStyle,
      ...other,
    } = this.props;

    const style = Object.assign({}, defaultStyle, propsStyle);

    return (
      <RaisedButton
        style={style}
        labelStyle={{fontWeight: 'inherit'}}
        {...other}
      />
    );
  }
}

export default pure(XmanButton);

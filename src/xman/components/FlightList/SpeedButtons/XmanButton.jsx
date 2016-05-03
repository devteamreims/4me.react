import React, { Component } from 'react';

import RaisedButton from 'material-ui/lib/raised-button';

const defaultStyle = {
  minWidth: 0,
  width: 60,
};

import PureRenderMixin from 'react-addons-pure-render-mixin';

class XmanButton extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {
      style: propsStyle,
      dimmed = false,
      ...other,
    } = this.props;

    const style = Object.assign({}, defaultStyle, propsStyle);

    return <RaisedButton
      style={style}
      labelStyle={{fontWeight: 'inherit'}}
      {...other}
    />
  }
}

export default XmanButton;

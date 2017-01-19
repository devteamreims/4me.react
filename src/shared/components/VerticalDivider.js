// @flow
import React, { Component } from 'react';

type Props = {
  style?: Object,
};

class VerticalDivider extends Component {
  props: Props;

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  }

  render() {
    const {
      style,
      ...other
    } = this.props;

    const {
      prepareStyles,
      baseTheme,
    } = this.context.muiTheme; // Extract colors from material-ui theme

    const styles = {
      margin: 0,
      marginLeft: -1,
      width: 1,
      minHeight: '100%',
      backgroundColor: baseTheme.palette.borderColor,
    };

    return (
      <div {...other} style={prepareStyles(Object.assign(styles, style))} />
    );
  }
}

export default VerticalDivider;

// @flow
import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import * as Colors from 'material-ui/styles/colors';

type Props = {
  disabled?: boolean,
  onArchive?: () => void,
  style?: Object,
};


export class ArchiveButton extends Component {
  props: Props;

  static defaultProps = {
    disabled: false,
    onArchive: () => {},
  };


  render() {
    const {
      disabled,
      onArchive,
      style,
    } = this.props;

    return (
      <FlatButton
        disabled={disabled}
        onClick={onArchive}
        label="Archive"
        style={style}
      />
    );
  }
}

export default ArchiveButton;

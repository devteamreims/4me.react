// @flow
import React, { Component } from 'react';
import moment from 'moment';

import FlatButton from 'material-ui/FlatButton';


type Props = {
  disabled?: boolean,
  onCancelSend?: () => void,
  sendTime?: ?Date,
  style?: Object,
};


export class UnsendButton extends Component {
  props: Props;

  static defaultProps = {
    disabled: false,
    loading: false,
    onCancelSend: () => {},
  };

  isStamSent = (): boolean => {
    const { sendTime } = this.props;

    if(!sendTime) {
      return false;
    }

    return moment(sendTime).isBefore(moment());
  };

  render() {
    const {
      disabled,
      onCancelSend,
      style,
    } = this.props;

    if(!this.isStamSent()) {
      return null;
    }

    return (
      <FlatButton
        disabled={disabled}
        onClick={onCancelSend}
        label="UNPUBLISH"
        style={style}
      />
    );
  }
}

export default UnsendButton;
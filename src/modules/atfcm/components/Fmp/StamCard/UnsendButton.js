// @flow
import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import * as Colors from 'material-ui/styles/colors';


import moment from 'moment';

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

  getLabelStyle = () => {
    const {
      disabled,
    } = this.props;

    if(disabled) {
      return null;
    }

    return {color: Colors.orange500};
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
        labelStyle={this.getLabelStyle()}
        onClick={onCancelSend}
        label="Prepare"
        style={style}
      />
    );
  }
}

export default UnsendButton;

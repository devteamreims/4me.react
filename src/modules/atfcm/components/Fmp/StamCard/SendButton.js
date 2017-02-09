// @flow
import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import * as Colors from 'material-ui/styles/colors';

import moment from 'moment';

type Props = {
  disabled?: boolean,
  backgroundColor?: string,
  onSelectTime?: (?number) => void,
  onCancelSend?: () => void,
  sendTime?: Date,
  sending?: boolean,
  style?: Object,
};

type State = {
  menuOpen: boolean,
  menuAnchor: ?EventTarget,
};

export class SendButton extends Component {
  props: Props;
  state: State;

  refreshInterval: *;

  static defaultProps = {
    disabled: false,
    onSelectTime: () => {},
    sending: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      menuOpen: false,
      menuAnchor: null,
    };

    this.refreshInterval = null;
  }

  componentDidMount() {
    const interval = 200;

    this.refreshInterval = setInterval(() => {
      this.forceUpdate();
    }, interval);
  }

  componentWillUnmount() {
    if(this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  handleRequestClose = () => {
    this.setState({menuOpen: false});
  };

  handleClick = (event: SyntheticEvent) => {
    event.preventDefault();

    this.setState({
      menuOpen: true,
      menuAnchor: event.currentTarget,
    });
  };

  handleSend = (duration: ?number) => () => {
    const {
      onSelectTime,
      onCancelSend,
    } = this.props;

    this.setState({menuOpen: false});

    if(duration !== null && typeof onSelectTime === 'function') {
      onSelectTime(duration);
    }

    if(duration === null && typeof onCancelSend === 'function') {
      onCancelSend();
    }
  };

  isStamSending = (): boolean => {
    const { sending } = this.props;

    return !!sending;
  };

  isStamSent = (): boolean => {
    const { sendTime } = this.props;

    if(!sendTime) {
      return false;
    }

    return moment(sendTime).isBefore(moment());
  };

  _getButtonLabel = () => {
    const {
      sendTime,
    } = this.props;

    if(this.isStamSending()) {
      return 'Sending ...';
    }

    if(this.isStamSent()) {
      return `Sent ${moment(sendTime).fromNow()}`;
    }

    if(!sendTime) {
      return 'Activate';
    }

    const duration = moment.duration(
      moment(sendTime).diff(moment.utc())
    );

    if(!duration.minutes()) {
      return `Sending in ${duration.seconds()} SECONDS`;
    }

    return `Sending in ${duration.humanize()}`;
  }

  getLabelStyle = () => {
    const {
      disabled,
      sendTime,
    } = this.props;

    if(disabled) {
      return null;
    }

    let color = Colors.green500;

    if(sendTime) {
      color = Colors.orange500;
    }

    return {color};
  };

  renderTimeSeries() {
    const minutes = [1, 2, 5, 10, 15];

    return minutes.map(t =>
      <MenuItem
        primaryText={`${t} minutes`}
        onClick={this.handleSend(t * 60)}
      />
    );
  }

  render() {
    const {
      disabled,
      sendTime,
      style,
    } = this.props;

    const {
      menuOpen,
      menuAnchor,
    } = this.state;

    if(this.isStamSent()) {
      return null;
    }

    return (
      <span>
        <FlatButton
          disabled={disabled}
          labelStyle={this.getLabelStyle()}
          onClick={this.handleClick}
          label={this._getButtonLabel()}
          style={style}
        />
        <Popover
          open={menuOpen}
          anchorEl={menuAnchor}
          onRequestClose={this.handleRequestClose}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <Menu>
            {sendTime &&
              <MenuItem
                primaryText={<span style={{color: Colors.red500}}>Cancel</span>}
                onClick={this.handleSend(null)}
              />
            }
            <MenuItem
              primaryText="Now"
              onClick={this.handleSend(0)}
            />
            {this.renderTimeSeries()}
          </Menu>
        </Popover>
      </span>
    );
  }
}

export default SendButton;
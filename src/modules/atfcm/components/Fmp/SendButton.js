// @flow
import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import * as Colors from 'material-ui/styles/colors';

import moment from 'moment';

type Props = {
  disabled?: boolean,
  backgroundColor?: string,
  onSelectTime?: (number) => void,
  onCancelSend?: () => void,
  sendTime?: Date,
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

  handleSend = (duration: number) => () => {
    const {
      onSelectTime,
    } = this.props;

    this.setState({menuOpen: false});

    if(typeof onSelectTime === 'function') {
      onSelectTime(duration);
    }
  };

  _getButtonLabel = () => {
    const { sendTime } = this.props;

    if(!sendTime) {
      return 'SEND';
    }

    const duration = moment.duration(
      moment(sendTime).diff(moment.utc())
    );

    if(!duration.minutes()) {
      return `Sending in ${duration.seconds()} SECONDS`;
    }

    return `Sending in ${duration.humanize()}`;
  }

  render() {
    const {
      disabled,
      sendTime,
      onCancelSend,
    } = this.props;

    const {
      menuOpen,
      menuAnchor,
    } = this.state;

    return (
      <div>
        <RaisedButton
          disabled={disabled}
          backgroundColor={Colors.green200}
          onClick={this.handleClick}
          label={this._getButtonLabel()}
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
                primaryText="Cancel"
                onClick={onCancelSend}
              />
            }
            <MenuItem
              primaryText="Now"
              onClick={this.handleSend(0)}
            />
            <MenuItem
              primaryText="5 minutes"
              onClick={this.handleSend(5 * 60)}
            />
            <MenuItem
              primaryText="10 minutes"
              onClick={this.handleSend(10 * 60)}
            />
            <MenuItem
              primaryText="15 minutes"
              onClick={this.handleSend(15 * 60)}
            />
          </Menu>
        </Popover>
      </div>

    );
  }
}

export default SendButton;

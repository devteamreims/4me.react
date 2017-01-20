// @flow
import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import * as Colors from 'material-ui/styles/colors';

type Props = {
  disabled?: boolean,
  backgroundColor?: string,
  onSelectTime?: (number) => void,
};

type State = {
  menuOpen: boolean,
  menuAnchor: *,
};

export class SendButton extends Component {
  props: Props;
  state: State;

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
  }

  handleRequestClose = () => {
    this.setState({menuOpen: false});
  };

  handleClick = (event) => {
    event.preventDefault();

    this.setState({
      menuOpen: true,
      menuAnchor: event.currentTarget,
    });
  };


  render() {
    const {
      disabled,
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
          label="send"
        />
        <Popover
          open={menuOpen}
          anchorEl={menuAnchor}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Now" secondaryText="test" />
            <MenuItem primaryText="5 minutes" />
            <MenuItem primaryText="10 minutes" />
            <MenuItem primaryText="15 minutes" />
          </Menu>
        </Popover>
      </div>

    );
  }
}

export default SendButton;

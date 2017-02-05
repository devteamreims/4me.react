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
  onSelectTime?: (?number) => void,
  onCancelArchive?: () => void,
  archiveTime?: Date,
  style?: Object,
};

type State = {
  menuOpen: boolean,
  menuAnchor: ?EventTarget,
};

export class ArchiveButton extends Component {
  props: Props;
  state: State;

  refreshInterval: *;

  static defaultProps = {
    disabled: false,
    onSelectTime: () => {},
    onCancelArchive: () => {},
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

  handleArchive = (duration: ?number) => () => {
    const {
      onSelectTime,
      onCancelArchive,
    } = this.props;

    this.setState({menuOpen: false});

    if(duration !== null && typeof onSelectTime === 'function') {
      onSelectTime(duration);
    }

    if(duration === null && typeof onCancelArchive === 'function') {
      onCancelArchive();
    }
  };


  isStamArchived = (): boolean => {
    const { archiveTime } = this.props;

    if(!archiveTime) {
      return false;
    }

    return moment(archiveTime).isBefore(moment());
  };

  _getButtonLabel = () => {
    const {
      archiveTime,
    } = this.props;

    if(!archiveTime) {
      return 'Archive';
    }

    const duration = moment.duration(
      moment(archiveTime).diff(moment.utc())
    );

    if(!duration.minutes()) {
      return `Archiving in ${duration.seconds()} SECONDS`;
    }

    return `Archiving in ${duration.humanize()}`;
  }

  getLabelStyle = () => {
    const {
      archiveTime,
      disabled,
    } = this.props;

    if(disabled) {
      return null;
    }

    if(!archiveTime) {
      return null;
    }

    return {color: Colors.blue500};
  };

  render() {
    const {
      disabled,
      archiveTime,
      style,
    } = this.props;

    const {
      menuOpen,
      menuAnchor,
    } = this.state;

    if(this.isStamArchived()) {
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
            {archiveTime &&
              <MenuItem
                primaryText={<span style={{color: Colors.red500}}>Cancel</span>}
                onClick={this.handleArchive(null)}
              />
            }
            <MenuItem
              primaryText="Now"
              onClick={this.handleArchive(0)}
            />
            <MenuItem
              primaryText="5 minutes"
              onClick={this.handleArchive(5 * 60)}
            />
            <MenuItem
              primaryText="10 minutes"
              onClick={this.handleArchive(10 * 60)}
            />
            <MenuItem
              primaryText="15 minutes"
              onClick={this.handleArchive(15 * 60)}
            />
          </Menu>
        </Popover>
      </span>
    );
  }
}

export default ArchiveButton;

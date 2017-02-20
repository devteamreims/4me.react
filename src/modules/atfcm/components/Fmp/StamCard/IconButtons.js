/* @flow */
import React from 'react';
import moment from 'moment';

import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import {
  red500 as cancelColor,
  orange500 as activeColor,
} from 'material-ui/styles/colors';

import Delete from 'material-ui/svg-icons/action/delete';
import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import Share from 'material-ui/svg-icons/social/share';
import Send from 'material-ui/svg-icons/content/send';
import Backspace from 'material-ui/svg-icons/content/backspace';
import Archive from 'material-ui/svg-icons/content/archive';


type CommonProps = {
  disabled?: boolean,
};

export const AddFlightButton = (props: CommonProps) => (
  <IconButton
    tooltip="Add a flight"
    {...props}
  >
    <ActionAdd />
  </IconButton>
);

export const DeleteStamButton = (props: CommonProps) => (
  <IconButton
    tooltip="Delete this stam"
    {...props}
  >
    <Delete />
  </IconButton>
);

type PublishButtonProps = {
  sendTime: ?Date,
  onSelectTime: Function,
  onCancel: Function,
};


const getMenuLabel = (rawDuration: number): string => {
  if(rawDuration === 0) {
    return 'Now';
  }

  const duration = moment.duration(rawDuration, 'seconds');

  if(!duration.minutes()) {
    return `In ${duration.seconds()}s`;
  }

  return `In ${duration.minutes()}min`;
};

const steps = [0, 20, 60, 60 * 3, 60 * 5, 60 * 10, 60 * 15];

const getMenuItems = (props: PublishButtonProps): Array<?React.Element<*>> => {
  const {
    sendTime,
    onSelectTime,
    onCancel,
  } = props;

  return [
    sendTime ? (
      <MenuItem onTouchTap={onCancel} style={{color: cancelColor}}>
        Cancel
      </MenuItem>
    ) : null,
    ...steps.map(step =>
      <MenuItem
        onTouchTap={() => onSelectTime(step)}
      >
        {getMenuLabel(step)}
      </MenuItem>
    )
  ];
};

export const PublishButton = (props: PublishButtonProps & CommonProps) => {
  const {
    sendTime,
    onSelectTime, // eslint-disable-line no-unused-vars
    onCancel, // eslint-disable-line no-unused-vars
    ...rest,
  } = props;

  if(sendTime && moment(sendTime).isBefore(moment())) {
    return null;
  }

  let iconColor;

  if(sendTime) {
    iconColor = activeColor;
  }

  return (
    <IconMenu
      iconButtonElement={
        <IconButton
          tooltip="Publish STAM"
          {...rest}
        >
          <Share color={iconColor} />
        </IconButton>
      }
    >
      {getMenuItems(props)}
    </IconMenu>
  );
};

export const ArchiveButton = (props: PublishButtonProps & CommonProps) => {
  const {
    sendTime,
    onSelectTime, // eslint-disable-line no-unused-vars
    onCancel, // eslint-disable-line no-unused-vars
    ...rest,
  } = props;

  if(sendTime && moment(sendTime).isBefore(moment())) {
    return null;
  }

  let iconColor;

  if(sendTime) {
    iconColor = activeColor;
  }

  return (
    <IconMenu
      iconButtonElement={
        <IconButton
          tooltip="Archive STAM"
          {...rest}
        >
          <Archive color={iconColor} />
        </IconButton>
      }
    >
      {getMenuItems(props)}
    </IconMenu>
  );
};

export class PulseIcon extends React.Component {
  state: {
    colored: boolean,
  };
  pulseInterval: *;

  constructor(props: void) {
    super(props);

    this.state = {
      colored: true,
    };
  }

  componentDidMount() {
    this.pulseInterval = setInterval(() => this.setState({colored: !this.state.colored}), 1500);
  }

  componentWillUnmount() {
    clearInterval(this.pulseInterval);
  }

  render() {
    const { colored } = this.state;

    return (
      <IconButton
        tooltip="Archive STAM"
      >
        <Archive color={colored ? activeColor : undefined} />
      </IconButton>
    );
  }
}

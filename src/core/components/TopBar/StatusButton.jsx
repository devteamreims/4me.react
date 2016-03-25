import React from 'react';
import _ from 'lodash';

import IconButton from 'material-ui/lib/icon-button';

import Normal from 'material-ui/lib/svg-icons/action/done';
import Warning from 'material-ui/lib/svg-icons/alert/warning';
import Err from 'material-ui/lib/svg-icons/alert/error';

import {
  warning,
  error,
} from '../../../theme/colors';

const StatusButton = (props) => {
  const status = _.get(props, 'status', 'normal');
  let Icon;
  let color;

  switch(status) {
    case 'normal':
      Icon = Normal;
      break;
    case 'warning':
      Icon = Warning;
      color = warning;
      break;
    case 'error':
    default:
      Icon = Err;
      color = error;
      break;
  }
  return (
    <IconButton {..._.omit(props, 'status')}>
      <Icon color={color} />
    </IconButton>
  );
};

export default StatusButton;

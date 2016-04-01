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

import StatusIcon from '../Status/StatusIcon';

const StatusButton = (props) => {
  const {
    status = 'normal',
    ...other,
  } = props;

  return (
    <IconButton {...other}>
      <StatusIcon
        level={status}
        colored={status !== 'normal'}
      />
    </IconButton>
  );
};

export default StatusButton;

import React from 'react';

import Badge from 'material-ui/Badge';

import {
  info,
  warning,
  critical,
} from '../../../theme/colors';

export const NotificationIcon = ({
  count,
  priority = 'info',
  ...rest
}) => {
  if(!count) {
    return null;
  }

  let color = info;

  if(priority === 'critical') {
    color = critical;
  }

  if(priority === 'warning') {
    color = warning;
  }

  const badgeStyle = {
    backgroundColor: color,
    fontWeight: 'bolder',
  };


  return (
    <Badge
      badgeContent={count}
      badgeStyle={badgeStyle}
      {...rest}
    />
  );
};

export default NotificationIcon;

import React from 'react';

import Badge from 'material-ui/Badge';

import {
  info,
  warning,
  critical,
} from '../../theme/colors';

const badgeStyles = {
  info: {
    backgroundColor: info,
    fontWeight: 'bold',
  },
  warning: {
    backgroundColor: warning,
    fontWeight: 'bolder',
  },
  critical: {
    backgroundColor: critical,
    fontWeight: 'bolder',
  },
  low: {
    backgroundColor: 'grey',
    fontWeight: 'normal',
  },
};

export const NotificationIcon = ({
  count,
  priority = 'info',
  ...rest
}) => {
  if(!count) {
    return null;
  }

  const badgeStyle = badgeStyles[priority];

  return (
    <Badge
      badgeContent={count}
      badgeStyle={badgeStyle}
      {...rest}
    />
  );
};

export default NotificationIcon;

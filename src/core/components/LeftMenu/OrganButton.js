import React from 'react';

import MenuItem from 'material-ui/MenuItem';
import NotificationIcon from './NotificationIcon';

const styles = {
  selectedItem: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
};

export const OrganButton = ({
  isActive,
  transition,
  secondary,
  title,
  notifications,
}) => {
  const style = {
    textDecoration: 'none',
  };

  let secondaryText = null;
  let rightIcon = null;

  // We can supply a secondary prop which will take precedence over notifications prop
  if(secondary) {
    secondaryText = secondary;
  } else if(notifications && notifications.count) {
    rightIcon = (
      <NotificationIcon
        {...notifications}
      />
    );
  }

  const activeStyle = Object.assign({}, style, styles.selectedItem);

  return (
    <MenuItem
      primaryText={title}
      style={isActive ? activeStyle : style}
      secondaryText={secondaryText}
      rightIcon={rightIcon}
      onClick={transition}
    />
  );
};

export default OrganButton;

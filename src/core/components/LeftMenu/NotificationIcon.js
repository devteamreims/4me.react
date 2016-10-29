import React from 'react';

import NumericBox from '../icons/NumericBox';
import {
  info,
  warning,
  critical,
} from '../../../theme/colors';

export const NotificationIcon = ({count, priority = 'info', style, ...rest}) => {
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

  const ComponentSlug = NumericBox[count] || NumericBox['9plus'];

  // This workaround is here because we render this element as a secondaryText
  // Material-ui has 2 ways of putting stuff on the right hand side of a MenuItem
  // First one is to use rightIcon prop, which will place the icon in the right place
  // but breaks when trying to render anything different
  // Second one is to use secondaryText prop which works fine for text but breaks for icons
  // since it relies on line-height to vertically align stuff
  // This hack will push the rendered icon a little bit down to realign
  // const materialUiHack = {position: 'relative', top: 6};

  const newStyles = Object.assign(
    {},
    style,
    // materialUiHack,
    {fill: color},
  );

  return (
    <ComponentSlug style={newStyles} {...rest} />
  );
};

export default NotificationIcon;

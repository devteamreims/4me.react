// @flow
import React from 'react';

import Avatar from 'material-ui/Avatar';
import * as Colors from 'material-ui/styles/colors';

const colors = [{
  color: Colors.fullWhite,
  backgroundColor: Colors.pink300,
}, {
  color: Colors.fullWhite,
  backgroundColor: Colors.deepPurple300,
}, {
  color: Colors.fullBlack,
  backgroundColor: Colors.blue300,
}, {
  color: Colors.fullBlack,
  backgroundColor: Colors.teal300,
}, {
  color: Colors.fullBlack,
  backgroundColor: Colors.lime300,
}, {
  color: Colors.fullBlack,
  backgroundColor: Colors.amber300,
}];

type ColorPair = {
  color: string,
  backgroundColor: string,
};

function hashStringToNumber(str: string): number {
  let hash = 0;
  let i;
  let chr;
  let len;

  if (str.length === 0) {
    return hash;
  }

  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return Math.abs(hash);
}

const idToColor = (id: string | number): ColorPair => {
  if(typeof id === 'number') {
    return colors[id % colors.length];
  }
  if(typeof id === 'string') {
    const hash = hashStringToNumber(id);
    return colors[hash % colors.length];
  }

  return colors[0];
};

type Props = {
  stamId?: string | number,
};

export const StamAvatar = ({
  stamId,
  ...otherProps
}: Props) => {
  const props = {};

  if(stamId) {
    const { color, backgroundColor } = idToColor(stamId);
    Object.assign(props, {color, backgroundColor});
  }

  return (
    <Avatar
      {...props}
      {...otherProps}
    />
  );
};

export default StamAvatar;

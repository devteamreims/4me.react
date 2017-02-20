// @flow
import React, { Component } from 'react';

import * as Colors from 'material-ui/styles/colors';


const colorBases = [
  'pink',
  'purple',
  'indigo',
  'lightBlue',
  'green',
  'deepOrange',
  'brown',
];

/* http://stackoverflow.com/a/7616484/194685 */
function hashCode(str: string): number {
  let hash = 0;
  let i;
  let chr;
  let len;

  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/* This component will wrap content in a span with a random color based on prop 'hash'
 * If hash is set to -1, then we'll return a specific color (bluegrey)
 */

export function hashToColor(rawHash: string | number): string {
  const colorLevel = '200';

  if(rawHash === -1) {
    return Colors[`blueGrey${colorLevel}`];
  }

  let hash;

  if(typeof rawHash === 'number') {
    hash = rawHash;
  } else if(typeof rawHash === 'string') {
    hash = hashCode(rawHash);
  } else {
    throw new Error('Invalid argument');
  }

  const colorString = colorBases[hash % colorBases.length];

  return Colors[`${colorString}${colorLevel}`];
}

type Props = {
  hash: string | number,
  children?: React.Element<*>,
};

class ColorizedContent extends Component {
  props: Props;

  render() {
    const {
      hash,
      children,
    } = this.props;

    const color = hashToColor(hash);

    return (
      <span style={{color}}>
        {children}
      </span>
    );
  }
}

export default ColorizedContent;

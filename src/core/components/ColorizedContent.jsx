import React, { Component } from 'react';

import * as Colors from 'material-ui/styles/colors';

import _ from 'lodash';

const colorLevel = '200';
const colors = _.map([
  'pink',
  'purple',
  'indigo',
  'lightBlue',
  'green',
  'deepOrange',
  'brown',
], str => Colors[str + colorLevel]);


/* http://stackoverflow.com/a/7616484/194685 */
function hashCode(str) {
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

class ColorizedContent extends Component {

  _hashToColor(rawHash) {
    if(rawHash === -1) {
      return Colors[`blueGrey${colorLevel}`];
    }

    let hash;

    if(_.isNumber(rawHash)) {
      hash = rawHash;
    } else if(_.isString(rawHash)) {
      hash = hashCode(rawHash);
    } else {
      throw new Error('Invalid argument');
    }

    return colors[hash % colors.length];
  }


  render() {
    const {
      hash,
      children,
    } = this.props;

    const color = this._hashToColor(hash);

    return (
      <span style={{color}}>
        {children}
      </span>
    );
  }
}

ColorizedContent.propTypes = {
  hash: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
};

export default ColorizedContent;

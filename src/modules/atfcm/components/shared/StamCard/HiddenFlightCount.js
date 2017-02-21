/* @flow */
import React from 'react';

type Props = {
  count: number,
  prepend?: string,
  append?: string,
  onClick?: Function,
};

export class HiddenFlightCount extends Component {
  props: Props;

  pluralizeFlightString() {
    const { count } = this.props;

    if(count > 1) {
      return 'flights';
    }

    return 'flight';
  }

  render() {
    const {
      count,
      prepend,
      append,
      onClick,
    } = this.props;

    if(!count) {
      return null;
    }


    return (
      <span>{count} hidden {this.pluralizeFlightString()}</span>
    );
  }
}

export default HiddenFlightCount;

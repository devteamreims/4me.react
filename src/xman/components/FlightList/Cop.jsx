import React, { Component } from 'react';

import moment from 'moment';

import ToneDowner from './ToneDowner';

class Cop extends Component {
  render() {
    const {
      name,
      targetTime,
      estimatedTime,
    } = this.props;

    const tto = moment.utc(targetTime);
    const formattedTto = tto.format('HH:mm');

    let estimates = `${formattedTto}`;

    if(estimatedTime) {
      const eto = moment.utc(estimatedTime);
      const timeDifference = tto.diff(eto, 'minutes');
      if(timeDifference !== 0) {
        const sign = timeDifference >= 0 ? '+' : '';
        estimates += `(${sign}${timeDifference})`;
      }
    }

    return (
      <div style={{flexDirection: 'column'}}>
        <ToneDowner
          path="cop"
          value={name}
        >
          <span>{name}</span>
        </ToneDowner>
        <div>{estimates}</div>
      </div>
    );
  }
}

Cop.PropTypes = {
  name: React.PropTypes.string.isRequired,
  targetTime: React.PropTypes.number.isRequired,
  estimatedTime: React.PropTypes.number.isRequired,
};

export default Cop;

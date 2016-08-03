import React from 'react';

import moment from 'moment';

import ToneDowner from './ToneDowner';

const Cop = ({name, targetTime, overrideText}) => {
  const tto = moment.utc(targetTime);
  const estimates = tto.format('HH:mm');

  return (
    <div style={{flexDirection: 'column'}}>
      <ToneDowner
        path="cop"
        value={name}
      >
        <span>{name}</span>
      </ToneDowner>
      <div>{overrideText || estimates}</div>
    </div>
  );
};

Cop.propTypes = {
  name: React.PropTypes.string.isRequired,
  targetTime: React.PropTypes.number.isRequired,
  estimatedTime: React.PropTypes.number.isRequired,
  overrideText: React.PropTypes.string,
};

export default Cop;

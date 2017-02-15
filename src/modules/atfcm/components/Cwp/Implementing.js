/* @flow */
import React from 'react';
import StamCard from './StamCard';

import type { ActiveStam } from '../../types';

type Props = {
  stams: Array<ActiveStam>,
};

class Implementing extends React.Component {
  props: Props;

  render() {
    const { stams } = this.props;
    return (
      <div>
        {stams.map(stam =>
          <StamCard
            stam={stam}
          />
        )}
      </div>
    );
  }
}

export default Implementing;

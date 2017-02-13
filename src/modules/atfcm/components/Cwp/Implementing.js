/* @flow */
import React from 'react';
import { connect } from 'react-redux';

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
          <div>
            <h3>{stam.offloadSector}</h3>
            <ul>
              {stam.flights.map(flight =>
                <li>{flight.arcid}</li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Implementing;

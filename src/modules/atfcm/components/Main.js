// @flow
import React, { Component } from 'react';

import R from 'ramda';

import RedirectToDashboard from '../../../shared/components/RedirectToDashboard';

import Paper from 'material-ui/Paper';


import type { Client, Sectors } from '../../../core/types';

type Props = {
  client: Client,
  sectors: Sectors,
};

class Main extends Component {
  props: Props;

  render() {
    const {
      client,
      sectors,
    } = this.props;

    const containerStyle = {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const boxStyle = {
      padding: 20,
      width: 400,
    };

    const shouldRedirectToDashboard: boolean = !R.isEmpty(sectors) && false;

    return (
      <div style={containerStyle}>
        {shouldRedirectToDashboard && <RedirectToDashboard />}
        <Paper
          zDepth={3}
          style={boxStyle}
        >
          <h3>This is an example module !</h3>
          <p>
            We are {client.name}<br />
            We are a {client.type}<br />
            This is our sectors : {sectors.join(',')}
          </p>
        </Paper>
      </div>
    );
  }
}


export default Main;

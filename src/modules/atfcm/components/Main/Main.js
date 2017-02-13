// @flow
import React, { Component } from 'react';
import R from 'ramda';
import RedirectToDashboard from '../../../../shared/components/RedirectToDashboard';

import ClientTypeToggler from './ClientTypeToggler';

import FmpMain from '../Fmp';
import CwpMain from '../Cwp';

import type { Client, Sectors, ClientType } from '../../../../core/types';

type Props = {
  client: Client,
  sectors: Sectors,
};

type State = {
  clientType: ClientType,
};

class Main extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    const { client } = props;

    this.state = {
      clientType: R.propOr('cwp', 'type', client),
    };
  }

  componentDidMount() {
    if(!this.refreshInterval) {
      this.refreshInterval = setInterval(() => this.forceUpdate(), 1000);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { client: oldClient } = this.props;
    const { client } = nextProps;

    const getClientType = R.propOr('cwp', 'type');

    if(getClientType(oldClient) !== getClientType(client)) {
      const clientType = getClientType(client);
      this.setState({clientType});
    }
  }

  componentWillUnmount() {
    if(this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  refreshInterval = null;

  handleClientTypeChange = (ev: *, clientType: ClientType) => {
    this.setState({clientType});
  };

  _renderMainComponent = () => {
    const {
      clientType,
    } = this.state;

    const {
      sectors,
    } = this.props;

    if(clientType === 'flow-manager') {
      return (
        <FmpMain />
      );
    } else if(clientType === 'cwp') {
      return (
        <CwpMain
          sectors={sectors}
        />
      );
    }

    return (<div>{clientType}</div>);
  };

  render() {
    const {
      client,
      sectors,
    } = this.props;

    // Disable return to dashboard for dev purposes
    const shouldRedirectToDashboard: boolean = false && !R.isEmpty(sectors);
    const containerStyle = {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
    };

    return (
      <div style={containerStyle}>
        {shouldRedirectToDashboard && <RedirectToDashboard />}
        <ClientTypeToggler
          onChange={this.handleClientTypeChange}
          defaultSelected={client.type || 'cwp'}
        />
        {this._renderMainComponent()}
      </div>
    );
  }
}

export default Main;

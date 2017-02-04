// @flow
import React, { Component } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';

import RedirectToDashboard from '../../../../shared/components/RedirectToDashboard';

import ClientTypeToggler from './ClientTypeToggler';

import FmpMain from '../Fmp';

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

  componentWillReceiveProps(nextProps: Props) {
    const { client } = nextProps;
    const clientType = R.propOr('cwp', 'type', client);
    this.setState({clientType});
  }

  handleClientTypeChange = (ev: *, clientType: ClientType) => {
    this.setState({clientType});
  };

  _renderMainComponent = () => {
    const {
      clientType,
    } = this.state;

    if(clientType === 'flow-manager') {
      const {
        activeStams,
        preparedStams,
        historyStams,
      } = this.props;

      return (
        <FmpMain
          activeStams={activeStams}
          preparedStams={preparedStams}
          historyStams={historyStams}
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


import {
  getActiveStams,
  getPreparedStams,
  getHistoryStams,
} from '../../reducers/entities/stams';

const mapStateToProps = state => {
  return {
    activeStams: getActiveStams(state),
    preparedStams: getPreparedStams(state),
    historyStams: getHistoryStams(state),
  };
};

export default connect(mapStateToProps)(Main);

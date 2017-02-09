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

type StamTypeString = 'active' | 'prepared' | 'archived';

class Main extends Component {
  props: Props & StateProps;
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
    const { client } = nextProps;
    const clientType = R.propOr('cwp', 'type', client);
    this.setState({clientType});
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

  getStamsByType = (type: StamTypeString): Array<Stam> => {
    const { stams } = this.props;

    switch(type) {
      case 'prepared':
        return stams.filter(isStamPrepared);
      case 'archived':
        return stams.filter(isStamArchived);
      case 'active':
      default:
        return stams.filter(isStamActive);
    }
  };

  _renderMainComponent = () => {
    const {
      clientType,
    } = this.state;

    if(clientType === 'flow-manager') {
      return (
        <FmpMain
          activeStams={this.getStamsByType('active')}
          preparedStams={this.getStamsByType('prepared')}
          historyStams={this.getStamsByType('archived')}
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
  getStams,
  isStamActive,
  isStamPrepared,
  isStamArchived,
} from '../../reducers/entities/stams';

import type { Stam } from '../Fmp/types';

type StateProps = {
  stams: Array<Stam>,
};

const mapStateToProps = state => {
  return {
    stams: getStams(state),
  };
};

export default connect(mapStateToProps)(Main);

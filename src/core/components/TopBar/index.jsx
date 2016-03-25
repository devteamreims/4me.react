import React, { Component } from 'react';

import { connect } from 'react-redux';

import AppBar from 'material-ui/lib/app-bar';

import RefreshButton from './RefreshButton';
import HelpButton from './HelpButton';
import StatusButton from './StatusButton';

import { Link } from 'react-router';

import {
  getCwpName,
} from '../../selectors/cwp';

import {
  getSectors
} from '../../selectors/sector';

import {
  getPrettifySectors
} from '../../selectors/sectorTree';

import {
  getStatusString
} from '../../selectors/status';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

export class TopBar extends Component {
  _goToDashboard() {
    this.context.router.push('/');
  }

  _goToStatus() {
    this.context.router.push('/status');
  }

  render() {
    const sectors = _.isEmpty(this.props.sectors) ?
      '' :
      ` - ${this.props.prettifiedSectors}`;

    return (
      <AppBar
        title={
          <span
            onClick={() => this._goToDashboard()}
            style={styles.title}
          >4ME ({this.props.cwpName}){sectors}</span>
        }
        iconElementRight={
          <div>
            <StatusButton
              status={this.props.status}
              onClick={() => this._goToStatus()}
            />
            <HelpButton />
            <RefreshButton />
          </div>
        }
        iconElementLeft={<div></div>}
      />
    );
  }
}

TopBar.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const sectors = getSectors(state);
  return {
    cwpName: getCwpName(state),
    sectors,
    prettifiedSectors: getPrettifySectors(state)(sectors),
    status: getStatusString(state),
  }
};

export default connect(mapStateToProps)(TopBar);

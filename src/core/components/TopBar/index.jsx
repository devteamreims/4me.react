import React, { Component } from 'react';

import { connect } from 'react-redux';

import AppBar from 'material-ui/lib/app-bar';

import RefreshButton from './RefreshButton';
import HelpButton from './HelpButton';
import StatusButton from './StatusButton';

import { Link } from 'react-router';

export class TopBar extends Component {
  _goToDashboard() {
    this.context.router.push('/');
  }

  _goToStatus() {
    this.context.router.push('/status');
  }

  render() {
    const styles = {
      title: {
        cursor: 'pointer',
        color: this.context.muiTheme.palette.textColor,
      },
    };

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
            {false && <HelpButton />}
            <RefreshButton />
          </div>
        }
        iconElementLeft={<div></div>}
        style={{flexShrink: '0'}}
      />
    );
  }
}

TopBar.contextTypes = {
  router: React.PropTypes.object.isRequired,
  muiTheme: React.PropTypes.object.isRequired,
};


import {
  getCwpName,
} from '../../selectors/cwp';

import {
  getSectors,
} from '../../selectors/sector';

import {
  getPrettifySectors,
} from '../../selectors/sectorTree';

import {
  getGlobalStatusString,
} from '../../selectors/status';

const mapStateToProps = (state) => {
  const sectors = getSectors(state);
  return {
    cwpName: getCwpName(state),
    sectors,
    prettifiedSectors: getPrettifySectors(state)(sectors),
    status: getGlobalStatusString(state),
  }
};

export default connect(mapStateToProps)(TopBar);

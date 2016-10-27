import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import AppBar from 'material-ui/AppBar';

import RefreshButton from './RefreshButton';
import HelpButton from './HelpButton';
import StatusButton from './StatusButton';
import Clock from './Clock';

import * as Colors from '../../../theme/colors';


export class TopBar extends Component {
  _goToDashboard() {
    const {
      indexRoute,
    } = this.props;

    this.context.router.push(indexRoute || '/');
  }

  _goToStatus() {
    this.context.router.push('/status');
  }

  getColor = () => {
    const {
      sectors,
      isNormalCwp,
    } = this.props;

    if(isNormalCwp && _.isEmpty(sectors)) {
      return Colors.accent1Color;
    }

    return Colors.primary1Color;
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
          >
            4ME ({this.props.cwpName}){sectors}
            {' - '}
            <Clock style={Object.assign({}, styles.title, {cursor: undefined})} />
          </span>
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
        iconElementLeft={<span />}
        style={{flexShrink: '0', backgroundColor: this.getColor()}}
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
  isNormalCwp,
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

import {
  getIndexRoute,
} from '../../selectors/routes';

const mapStateToProps = (state) => {
  const sectors = getSectors(state);
  return {
    cwpName: getCwpName(state),
    sectors,
    isNormalCwp: isNormalCwp(state),
    prettifiedSectors: getPrettifySectors(state)(sectors),
    status: getGlobalStatusString(state),
    indexRoute: getIndexRoute(state),
  };
};

export default connect(mapStateToProps)(TopBar);

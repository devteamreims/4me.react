import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import R from 'ramda';

import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui/svg-icons/action/home';

import RefreshButton from './RefreshButton';
import HelpButton from './HelpButton';
import StatusButton from './StatusButton';
import Clock from './Clock';

import { Link } from 'react-router';

import { primary1Color } from '../../../theme/colors';
import * as Colors from 'material-ui/styles/colors';

export class TopBar extends Component {
  getColor = () => {
    const {
      sectors,
      isNormalCwp,
    } = this.props;

    if(isNormalCwp && _.isEmpty(sectors)) {
      return Colors.grey900;
    }

    return primary1Color;
  }

  render() {
    const {
      cwpName,
    } = this.props;

    const styles = {
      title: {
        cursor: 'pointer',
        color: this.context.muiTheme.palette.textColor,
      },
    };

    const titleString = _.isEmpty(this.props.sectors) ?
      '' :
      ` - ${this.props.prettifiedSectors}`;


    // Note : We render an empty <span /> in iconElementLeft
    // MUI will render an icon if we don't provide this prop
    return (
      <AppBar
        iconElementLeft={
          <Link
            to="/"
            style={{textDecoration: 'none'}}
          >
            <IconButton>
              <HomeIcon />
            </IconButton>
          </Link>
        }
        title={
          <Link
            to="/"
            style={{textDecoration: 'none'}}
          >
            <span style={styles.title}>
              <Clock />
              {titleString}
            </span>
          </Link>
        }
        iconElementRight={
          <div>
            <Link to="/status">
              <StatusButton
                status={this.props.status}
              />
            </Link>
            {false && <HelpButton />}
            <RefreshButton />
          </div>
        }
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
  getCoreStatus,
  maxStatus,
} from '../../selectors/status';

import {
  getIndexRoute,
} from '../../selectors/routes';

import * as ExampleModule from '../../../example-module';
import * as MappingModule from '../../../mapping';
import * as EtfmsProfileModule from '../../../arcid';
import * as XmanModule from '../../../xman';

import { isModuleDisabled } from '../../../fmeModules';

const getStatusStringSelector = ({name, getStatusString}) => {
  if(isModuleDisabled(name) || !getStatusString) {
    return () => 'normal';
  }

  return getStatusString;
};

const getModulesStatus = state => [
  getStatusStringSelector(ExampleModule)(state),
  getStatusStringSelector(MappingModule)(state),
  getStatusStringSelector(EtfmsProfileModule)(state),
  getStatusStringSelector(XmanModule)(state),
];


const mapStateToProps = (state) => {
  const sectors = getSectors(state);


  const status = maxStatus([
    R.prop('status', getCoreStatus(state)),
    ...getModulesStatus(state),
  ]);

  return {
    cwpName: getCwpName(state),
    sectors,
    isNormalCwp: isNormalCwp(state),
    prettifiedSectors: getPrettifySectors(state)(sectors),
    status,
    indexRoute: getIndexRoute(state),
  };
};

export default connect(mapStateToProps)(TopBar);

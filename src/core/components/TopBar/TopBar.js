import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import R from 'ramda';

import getEnv from '4me.env';
const { prettyName } = getEnv(window.FOURME_CONFIG.FOURME_ENV).sectors;

import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui/svg-icons/action/home';

import RefreshButton from './RefreshButton';
import HelpButton from './HelpButton';
import StatusButton from './StatusButton';
import Clock from './Clock';

import { Link } from 'react-router';

import { primary1Color, canvasColor } from '../../../theme/colors';
import * as Colors from 'material-ui/styles/colors';


export class TopBar extends Component {
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  getColor = () => {
    const {
      sectors,
      isNormalCwp,
    } = this.props;

    if(isNormalCwp && _.isEmpty(sectors)) {
      return canvasColor;
    }

    return primary1Color;
  }

  computeTitleString = () => {
    const {
      sectors,
      isNormalCwp,
    } = this.props;

    if(!isNormalCwp) {
      return '';
    }

    if(_.isEmpty(sectors)) {
      return (
        <span> - <span style={{color: Colors.red500}}>CLOSED CWP</span></span>
      );
    }

    return ` - ${prettyName(sectors)}`;
  }

  render() {
    const {
      status,
    } = this.props;

    const styles = {
      title: {
        cursor: 'pointer',
        color: this.context.muiTheme.palette.textColor,
      },
    };

    const titleString = this.computeTitleString();

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
                status={status}
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

import {
  isNormalCwp,
} from '../../selectors/client';

import {
  getSectors,
} from '../../selectors/sector';

import {
  getCoreStatus,
} from '../../selectors/status';

import {
  maxStatus,
} from '../../../shared/utils/status';


import * as ExampleModule from '../../../modules/example-module';
import * as MappingModule from '../../../modules/mapping';
import * as EtfmsProfileModule from '../../../modules/etfms-profile';
import * as XmanModule from '../../../modules/xman';

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
    sectors,
    isNormalCwp: isNormalCwp(state),
    status,
  };
};

export default connect(mapStateToProps)(TopBar);

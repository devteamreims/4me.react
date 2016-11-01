import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import R from 'ramda';

import AppBar from 'material-ui/AppBar';

import RefreshButton from './RefreshButton';
import HelpButton from './HelpButton';
import StatusButton from './StatusButton';
import Clock from './Clock';

import { Link } from 'react-router';

import * as Colors from '../../../theme/colors';


export class TopBar extends Component {
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
    const {
      cwpName,
    } = this.props;

    const styles = {
      title: {
        cursor: 'pointer',
        color: this.context.muiTheme.palette.textColor,
      },
    };

    const sectors = _.isEmpty(this.props.sectors) ?
      '' :
      ` - ${this.props.prettifiedSectors}`;

    const titleString = `4ME (${cwpName})${sectors} - `;

    // Note : We render an empty <span /> in iconElementLeft
    // MUI will render an icon if we don't provide this prop
    return (
      <AppBar
        title={
          <Link
            to="/"
            style={{textDecoration: 'none'}}
          >
            <span style={styles.title}>
              {titleString}
              <Clock style={Object.assign({}, styles.title, {cursor: undefined})} />
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


const mapStateToProps = (state) => {
  const sectors = getSectors(state);

  const moduleStatuses = [
    getStatusStringSelector(ExampleModule)(state),
    getStatusStringSelector(MappingModule)(state),
    getStatusStringSelector(EtfmsProfileModule)(state),
    getStatusStringSelector(XmanModule)(state),
  ];

  const status = maxStatus([
    R.prop('status', getCoreStatus(state)),
    ...moduleStatuses
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

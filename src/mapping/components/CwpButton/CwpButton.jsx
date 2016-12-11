// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import _ from 'lodash';
import R from 'ramda';

import getEnv from '4me.env';
const { getClientById } = getEnv(window.FOURME_CONFIG.FOURME_ENV).clients;
const { prettyName } = getEnv(window.FOURME_CONFIG.FOURME_ENV).sectors;

import {mapping as mappingConfig} from '../../../config';

import RaisedButton from 'material-ui/RaisedButton';
import MicOff from 'material-ui/svg-icons/av/mic-off';

import PositionName from './PositionName';
import PositionSectors from './PositionSectors';

import {
  cwpButton as buttonTheme,
} from '../../theme/colors';

import {
  error,
} from '../../../theme/colors';

// import './button.css';
//

const styles = {
  cwpButton: {
    borderRadius: '50% !important',
    // We select a bunch of stuff here, material-ui has a messy dom structure
    '& > button, & > button > div > div': {
      borderRadius: '50% !important',
    },
  },
};


class CwpButton extends Component {
  constructor(props) {
    super(props);
  }

  shouldDisplayEmergencyFrequencies() {
    return !_.get(mappingConfig, 'disableEmergencyRadios', false);
  }

  openDialog = () => {
    const {
      openDialog,
      isButtonEnabled,
      clientId,
    } = this.props;

    if(isButtonEnabled) {
      openDialog(clientId);
    }
  };

  render() {
    const {
      isRadioOk,
      isDisabled,
      name,
      style,
      clientId,
      myCwpId,
      sectors,
      sheet: {classes},
    } = this.props;

    const size = '100px';
    const buttonStyle = Object.assign({
      height: size,
      width: size,
    }, style);

    const containerStyle = {
      minHeight: size,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };

    let themeString = 'normal';
    if(isDisabled) {
      themeString = 'disabled';
    } else if(myCwpId === clientId) {
      themeString = 'mineNormal';
      if(R.isEmpty(sectors)) {
        themeString = 'mineEmpty';
      }
    } else {
      if(R.isEmpty(sectors)) {
        themeString = 'empty';
      }
    }

    const theme = buttonTheme[themeString];

    const { backgroundColor, textColor } = theme;

    const inside = (
      <div style={containerStyle}>
        <PositionName name={name} style={{color: textColor}} />
        <PositionSectors sectorName={prettyName(sectors)} style={{color: textColor}} />
        {
          this.shouldDisplayEmergencyFrequencies() &&
          !isRadioOk &&
          <MicOff color={error} style={{height: 20, width: 20}} />
        }
      </div>
    );

    return (
      <RaisedButton
        backgroundColor={backgroundColor}
        style={buttonStyle}
        onClick={this.openDialog}
        className={classes.cwpButton}
      >
        {inside}
      </RaisedButton>
    );
  }
}

CwpButton.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

import {
  getSectorsByCwpId,
  isDisabled as isCwpDisabled,
} from '../../selectors/map';

import {
  isSupervisor,
  getCwpId,
} from '../../../core/selectors/cwp';

import {
  isRadioOk,
} from '../../selectors/frequencies';

const mapStateToProps = () => (state, ownProps) => {
  const myCwpId = getCwpId(state);
  const sectors = getSectorsByCwpId(state, ownProps.clientId);

  const isButtonEnabled = isSupervisor(state) || process.env.NODE_ENV === 'development';

  const client = getClientById(ownProps.clientId);
  const name = client ? client.name : `CWP ${ownProps.clientId}`;

  return {
    sectors,
    myCwpId,
    name,
    isDisabled: isCwpDisabled(state, ownProps.clientId),
    isButtonEnabled: isButtonEnabled,
    isRadioOk: isRadioOk(state, ownProps.clientId),
  };
};

import {
  open,
} from '../../actions/dialog';

const mapDispatchToProps = {
  openDialog: open,
};

export default R.compose(
  injectSheet(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(CwpButton);

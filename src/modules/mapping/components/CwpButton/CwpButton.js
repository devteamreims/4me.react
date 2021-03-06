// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import R from 'ramda';

import {
  clients as envClients,
  sectors as envSectors,
} from '../../../../shared/env';

import { getConfig } from '../../config';

import RaisedButton from 'material-ui/RaisedButton';
import MicOff from 'material-ui/svg-icons/av/mic-off';

import PositionName from './PositionName';
import PositionSectors from './PositionSectors';

import {
  cwpButton as buttonTheme,
} from '../../theme/colors';

import {
  error,
} from '../../../../shared/theme/colors';

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
    return !getConfig().disableEmergencyRadios;
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
      myClientId,
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
    } else if(myClientId === clientId) {
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
        <PositionSectors sectorName={envSectors.prettyName(sectors)} style={{color: textColor}} />
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
  getClientId,
} from '../../../../core/selectors/client';

import {
  isRadioOk,
} from '../../selectors/frequencies';

const mapStateToProps = () => (state, ownProps) => {
  const myClientId = getClientId(state);
  const sectors = getSectorsByCwpId(state, ownProps.clientId);

  const isButtonEnabled = isSupervisor(state) || process.env.NODE_ENV === 'development';

  const client = envClients.getClientById(ownProps.clientId);
  const name = client ? client.name : `CWP ${ownProps.clientId}`;

  return {
    sectors,
    myClientId,
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

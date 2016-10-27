import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

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

import './button.scss';


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
      cwpId,
    } = this.props;

    if(isButtonEnabled) {
      openDialog(cwpId);
    }
  };

  render() {
    const {
      isRadioOk,
      isEmpty,
      isDisabled,
      name,
      prettySectors,
    } = this.props;

    const size = '100px';
    const buttonStyle = {
      height: size,
      width: size,
      borderRadius: '50%',
    };

    const containerStyle = {
      minHeight: size,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };

    let themeString = 'normal';

    if(isEmpty) {
      themeString = 'empty';
    }

    if(isDisabled) {
      themeString = 'disabled';
    }

    const theme = buttonTheme[themeString];

    const { backgroundColor, textColor } = theme;

    const inside = (
      <div style={containerStyle}>
        <PositionName name={name} style={{color: textColor}} />
        <PositionSectors sectorName={prettySectors} style={{color: textColor}} />
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
        className="mapping-cwp-button"
        rippleStyle={{borderRadius: '50%'}}
      >
        {inside}
      </RaisedButton>
    );
  }
}

CwpButton.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

import { getPrettifySectors } from '../../../core/selectors/sectorTree';

import {
  getSectorsByCwpId,
  isCwpEmpty,
} from '../../selectors/map';

import {
  getName,
  isDisabled as isCwpDisabled,
} from '../../selectors/cwp';

import {
  isSupervisor,
} from '../../../core/selectors/cwp';

import {
  isRadioOk,
} from '../../selectors/frequencies';

const mapStateToProps = () => (state, ownProps) => {
  const sectors = getSectorsByCwpId(state, ownProps.cwpId);

  const isButtonEnabled = isSupervisor(state) || process.env.NODE_ENV === 'development';

  return {
    sectors,
    prettySectors: getPrettifySectors(state)(sectors),
    name: getName(state, ownProps.cwpId),
    isDisabled: isCwpDisabled(state, ownProps.cwpId),
    isEmpty: isCwpEmpty(state, ownProps.cwpId),
    isButtonEnabled: isButtonEnabled,
    isRadioOk: isRadioOk(state, ownProps.cwpId),
  };
};

import {
  open,
} from '../../actions/dialog';

const mapDispatchToProps = {
  openDialog: open,
};

export default connect(mapStateToProps, mapDispatchToProps)(CwpButton);

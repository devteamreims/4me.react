import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';

import PositionName from './PositionName';
import PositionSectors from './PositionSectors';

import { cwpButton as buttonTheme } from '../../theme/colors';

import './button.scss';

class CwpButton extends Component {
  constructor(props) {
    super(props);
  }

  openDialog = () => {
    const {
      openDialog,
      isButtonEnabled,
      cwpId,
    } = this.props;

    console.log('POUET');
    console.log(process.env.NODE_ENV);

    isButtonEnabled && openDialog(cwpId);
  };

  render() {

    const size = '100px';
    const buttonStyle = {
      height: size,
      width: size,
    };

    let themeString = 'normal';

    if(this.props.isEmpty) {
      themeString = 'empty';
    }

    if(this.props.isDisabled) {
      themeString = 'disabled';
    }

    const theme = buttonTheme[themeString];

    const { backgroundColor, textColor } = theme;

    const inside = (
      <div>
        <PositionName name={this.props.name} style={{color: textColor}} />
        <PositionSectors sectorName={this.props.prettySectors} style={{color: textColor}} />
      </div>
    );

    return (
      <RaisedButton
        backgroundColor={backgroundColor}
        style={buttonStyle}
        onClick={this.openDialog}
        className="mapping-cwp-button"
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
  isFmp,
} from '../../../core/selectors/cwp';

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
  };
};

import {
  open,
  close,
} from '../../actions/dialog';

const mapDispatchToProps = {
  openDialog: open,
};

export default connect(mapStateToProps, mapDispatchToProps)(CwpButton);

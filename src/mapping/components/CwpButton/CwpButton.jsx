import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';

import PositionName from './PositionName';
import PositionSectors from './PositionSectors';

import { getPrettifySectors } from '../../../core/selectors/sectorTree';

import {
  getSectorsByCwpId,
  isCwpEmpty,
} from '../../selectors/map';

import {
  getName,
  isDisabled as isCwpDisabled,
} from '../../selectors/cwp';

import { cwpButton as buttonTheme } from '../../theme/colors';

import WhyDidYouUpdateMixin from '../WhyDidYouUpdate';

class CwpButton extends Component {
  constructor(props) {
    super(props);
  }

  openDialog = () => {
    this.props.openDialog(this.props.cwpId);
  };

/*
  componentDidUpdate() {
    WhyDidYouUpdateMixin.componentDidUpdate.bind(this)(...arguments);
  }
*/
  render() {

    const size = '100px';
    const buttonStyle = {
      height: size,
      width: size,
    };

    const themeString = this.props.isEmpty ? 'empty' : 'normal';

    const theme = buttonTheme[themeString];

    const { backgroundColor, textColor } = theme;

    const inside = (
      <div>
        <PositionName name={this.props.name} style={{color: textColor}} />
        <PositionSectors sectorName={this.props.prettySectors} style={{color: textColor}} />
      </div>
    );

    return (
      <div>
        <RaisedButton
          backgroundColor={backgroundColor}
          style={buttonStyle}
          disabled={this.props.isDisabled}
          onClick={this.openDialog}
        >
          {inside}
        </RaisedButton>
      </div>
    );
  }
}

CwpButton.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

const mapStateToProps = () => (state, ownProps) => {
  const sectors = getSectorsByCwpId(state, ownProps.cwpId);
  return {
    sectors,
    prettySectors: getPrettifySectors(state)(sectors),
    name: getName(state, ownProps.cwpId),
    isDisabled: isCwpDisabled(state, ownProps.cwpId),
    isEmpty: isCwpEmpty(state, ownProps.cwpId),
  };
};

import {
  open,
  close,
} from '../../actions/dialog';

const mapDispatchToProps = {
  openDialog: open
};

export default connect(mapStateToProps, mapDispatchToProps)(CwpButton);

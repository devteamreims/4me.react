import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';

import PositionName from './PositionName';
import PositionSectors from './PositionSectors';

import { getPrettifySectors } from '../../../core/selectors/sectorTree';

import { getSectorsByCwpId } from '../../selectors/map';
import { getName } from '../../selectors/cwp';

class CwpButton extends Component {
  render() {

    const size = '100px';
    const buttonStyle = {
      height: size,
      width: size,
      container: {
        borderRadius: 50,
      },
    };

    const inside = (
      <div style={{color: 'white'}}>
        <PositionName name={this.props.name} />
        <PositionSectors sectorName={this.props.prettySectors} />
      </div>
    );

    return (
      <RaisedButton
        style={buttonStyle}
        primary
      >
        {inside}
      </RaisedButton>
    );
  }
}

CwpButton.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const sectors = getSectorsByCwpId(state, ownProps.cwpId);
  return {
    sectors,
    prettySectors: getPrettifySectors(state)(sectors),
    name: getName(state, ownProps.cwpId),
  };
};

export default connect(mapStateToProps)(CwpButton);

import React, {Component} from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import {
  cwpButton as buttonTheme,
} from '../../theme/colors';

class WidgetCwpButton extends Component {
  static propTypes = {
    cwpId: React.PropTypes.number.isRequired,
    sectors: React.PropTypes.arrayOf(React.PropTypes.string),
    isDisabled: React.PropTypes.bool,
  };

  static defaultProps = {
    sectors: [],
    isDisabled: false,
  };

  render() {
    const {
      sectors,
      isDisabled,
      style,
    } = this.props;

    let themeString = 'normal';
    if(R.isEmpty(sectors)) {
      themeString = 'empty';
    }

    if(isDisabled) {
      themeString = 'disabled';
    }

    const theme = buttonTheme[themeString];

    const { backgroundColor } = theme;

    const newStyle = Object.assign({
      width: 28,
      height: 28,
      borderRadius: '50%',
      backgroundColor,
    }, style);

    return (
      <div style={newStyle} />
    );
  }
}

import {
  isDisabled as isCwpDisabled,
} from '../../selectors/cwp';

import {
  getSectorsByCwpId,
} from '../../selectors/map';

const mapStateToProps = (state, ownProps) => ({
  sectors: getSectorsByCwpId(state, ownProps.cwpId),
  isDisabled: isCwpDisabled(state, ownProps.cwpId),
});

export default connect(mapStateToProps)(WidgetCwpButton);

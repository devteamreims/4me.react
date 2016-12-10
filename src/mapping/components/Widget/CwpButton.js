import React, {Component} from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import {
  cwpButton as buttonTheme,
} from '../../theme/colors';

class WidgetCwpButton extends Component {
  static propTypes = {
    clientId: React.PropTypes.number.isRequired,
    myCwpId: React.PropTypes.number,
    sectors: React.PropTypes.arrayOf(React.PropTypes.string),
    isDisabled: React.PropTypes.bool,
    style: React.PropTypes.object,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
  };

  static defaultProps = {
    sectors: [],
    isDisabled: false,
    style: {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
  };

  state = {
    hovered: false,
  };

  handleMouseEnter = (event) => { // eslint-disable-line no-unused-vars
    const {
      clientId,
      onMouseEnter,
      sectors,
    } = this.props;

    if(R.isEmpty(sectors)) {
      return;
    }

    onMouseEnter(event, clientId);
    this.setState({hovered: true});
  };

  handleMouseLeave = (event) => { // eslint-disable-line no-unused-vars
    const {
      clientId,
      onMouseLeave,
    } = this.props;

    onMouseLeave(event, clientId);
    this.setState({hovered: false});
  };

  render() {
    const {
      clientId,
      myCwpId,
      sectors,
      isDisabled,
      style,
    } = this.props;

    const {
      hovered,
    } = this.state;


    const newStyle = Object.assign({
      width: 28,
      height: 28,
      borderRadius: '50%',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'transparent',
      transition: 'background-color .2s ease-out',
    }, style);

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
    const { backgroundColor } = theme;

    Object.assign(newStyle, {backgroundColor});

    if(!R.isEmpty(sectors) && hovered) {
      Object.assign(newStyle, {
        backgroundColor: buttonTheme.hovered.backgroundColor,
      });
    }

    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={newStyle}
      />
    );
  }
}

import {
  getSectorsByCwpId,
  isDisabled as isCwpDisabled,
} from '../../selectors/map';

import {
  getCwpId,
} from '../../../core/selectors/cwp';

const mapStateToProps = (state, ownProps) => ({
  myCwpId: getCwpId(state),
  sectors: getSectorsByCwpId(state, ownProps.clientId),
  isDisabled: isCwpDisabled(state, ownProps.clientId),
});

export default connect(mapStateToProps)(WidgetCwpButton);

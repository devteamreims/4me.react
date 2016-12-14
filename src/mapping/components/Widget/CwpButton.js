// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import getEnv from '4me.env';
const { prettyName } = getEnv(window.FOURME_CONFIG.FOURME_ENV).sectors;

import { Tooltip } from 'pui-react-tooltip';
import { OverlayTrigger } from 'pui-react-overlay-trigger';

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
    const { sectors } = this.props;
    if(R.isEmpty(sectors)) {
      return;
    }

    this.setState({hovered: true});
  };

  handleMouseLeave = (event) => { // eslint-disable-line no-unused-vars
    this.setState({hovered: false});
  };

  renderButton() {
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

  render() {
    const {
      sectors,
    } = this.props;

    // No sectors, render the button without tooltip overlay
    if(R.isEmpty(sectors)) {
      return this.renderButton();
    }

    const tooltip = (
      <Tooltip>{prettyName(sectors)}</Tooltip>
    );

    return (
      <OverlayTrigger
        placement="bottom"
        overlay={tooltip}
      >
        {this.renderButton()}
      </OverlayTrigger>
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

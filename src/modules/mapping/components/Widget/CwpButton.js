// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import { sectors as envSectors } from '../../../../shared/env';
const { prettyName } = envSectors;

import { Tooltip } from 'pui-react-tooltip';
import { OverlayTrigger } from 'pui-react-overlay-trigger';

import {
  cwpButton as buttonTheme,
} from '../../theme/colors';


type StateProps = {
  myClientId: any,
  sectors: any,
  isDisabled: boolean,
};

type ExternalProps = {
  clientId?: any,
  style?: Object,
};

type Props = ExternalProps & StateProps;

class WidgetCwpButton extends Component {
  props: Props;

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
      myClientId,
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
  getClientId,
} from '../../../../core/selectors/client';

const mapStateToProps = (state, ownProps: ExternalProps) => ({
  myClientId: getClientId(state),
  sectors: getSectorsByCwpId(state, ownProps.clientId),
  isDisabled: isCwpDisabled(state, ownProps.clientId),
});

export default connect(mapStateToProps)(WidgetCwpButton);

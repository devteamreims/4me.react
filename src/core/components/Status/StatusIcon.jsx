import React, { Component } from 'react';

import NormalIcon from 'material-ui/lib/svg-icons/action/done';
import WarningIcon from 'material-ui/lib/svg-icons/alert/warning';
import ErrorIcon from 'material-ui/lib/svg-icons/alert/error';

import {
  success,
  warning,
  error,
} from '../../../theme/colors';

class StatusIcon extends Component {
  render() {
    const {
      level,
      colored,
      ...other,
    } = this.props;

    let Icon;
    let color = '#FFF';

    switch(level) {
      case 'critical':
      case 'error':
        Icon = ErrorIcon;
        color = error;
        break;
      case 'warning':
        Icon = WarningIcon;
        color = warning;
        break;
      default:
        Icon = NormalIcon;
        color = success;
    }

    return (
      <Icon
        color={colored && color}
        {...other}
      />
    );
  }
}

StatusIcon.PropTypes = {
  level: React.PropTypes.oneOf(['normal', 'warning', 'critical', 'error']).isRequired,
  colored: React.PropTypes.bool,
};

export default StatusIcon;

import React, { Component } from 'react';

import Paper from 'material-ui/lib/paper';
import MenuItem from 'material-ui/lib/menus/menu-item';

import { Link } from 'react-router';

import organs from '../../organs';

import _ from 'lodash';

import { connect } from 'react-redux';

import NumericBox from './icons/NumericBox';

import {
  info,
  warning,
  critical,
} from '../../theme/colors';

function notificationToIcon(count, priority = 'info') {
  let color = info;

  if(priority === 'critical') {
    color = critical;
  }

  if(priority === 'warning') {
    color = warning;
  }

  if(count === 0) {
    return;
  }

  let ComponentSlug = NumericBox[count] || NumericBox['9plus'];

  return (
    <ComponentSlug style={{fill: color}} />
  )
}

class LeftMenu extends Component {
  render() {
    const Organs = _.map(this.props.organs, (organ) => {
      let rightIcon = false;

      if(organ.notifications.count >= 1) {
        rightIcon = notificationToIcon(organ.notifications.count, organ.notifications.priority)
      }

      return (
        <MenuItem
          key={organ.title}
          primaryText={organ.title}
          containerElement={<Link to={organ.linkTo} />}
          rightIcon={rightIcon}
        />
      );

    });

    return (
      <Paper
        zDepth={3}
      >
        {Organs}
      </Paper>
    );
  }
}

LeftMenu.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const organProps = _.map(organs, organ => {
    return {
      title: organ.name.toUpperCase(),
      linkTo: organ.name,
      notifications: organ.getNotifications(state),
    };
  });

  return {
    organs: organProps,
  };
};

//export default LeftMenu;

export default connect(mapStateToProps)(LeftMenu);

import React, { Component } from 'react';

import Paper from 'material-ui/lib/paper';
import MenuItem from 'material-ui/lib/menus/menu-item';

import { Link } from 'react-router';

import organs from '../../organs';

import _ from 'lodash';

class LeftMenu extends Component {
  browseTo(organName) {
    this.context.router.push(organName);
  }

  render() {
    const Organs = _.map(organs, (organ) =>
      (
        <MenuItem
          key={organ.name}
          onClick={() => this.browseTo(organ.name)}
        >
          {organ.name.toUpperCase()}
        </MenuItem>
      )
    );

    return (
      <Paper
        zDepth={3}
        className="testtest"
      >
        {Organs}
      </Paper>
    );
  }
}

LeftMenu.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default LeftMenu;

import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

import R from 'ramda';

import { Link } from 'react-router';

class LeftMenu extends Component {
  render() {
    const {
      rows = [],
    } = this.props;

    // This will wrap a component with a Link and forward two additional props :
    // isActive (bool), which will be true when the route is currently active
    // transition (fn), which is a callback to transition to the route
    const organToElement = ({pathName, component: Component}) => (
      <Link
        to={pathName}
        key={pathName}
        children={
          ({isActive, transition}) => <Component {...{isActive, transition}} />
        }
      />
    );

    return (
      <Paper
        zDepth={3}
      >
        {R.map(organToElement, rows)}
      </Paper>
    );
  }
}

export default LeftMenu;

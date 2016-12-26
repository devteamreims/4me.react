import React, {Component} from 'react';
import {connect} from 'react-redux';
import R from 'ramda';

import {
  OrganButton,
} from '../../../core/components/LeftMenu';

export class MenuButton extends Component {
  componentDidMount() {
    const {
      bootstrap,
    } = this.props;

    const {
      sectors = [],
    } = this.props;
    console.debug('XMAN MENUBUTTON MOUNTED', sectors);
    bootstrap(sectors);
  }

  componentWillReceiveProps(nextProps) {
    const {
      sectors,
      onSectorChange,
    } = this.props;

    const {
      sectors: nextSectors,
    } = nextProps;

    const sectorsHaveChanged = !R.isEmpty(R.symmetricDifference(sectors, nextSectors));

    if(sectorsHaveChanged) {
      // console.log('XMAN: New sectors bound !');
      onSectorChange(sectors, nextSectors);
    }
  }

  componentWillUnmount() {
    const {
      cleanUp,
    } = this.props;
    console.debug('XMAN MENUBUTTON UNMOUNT');
    cleanUp();
  }

  render() {
    const {
      isActive,
      transition,
      notifications,
    } = this.props;

    return (
      <OrganButton
        isActive={isActive}
        transition={transition}
        title="XMAN"
        notifications={notifications}
      />
    );
  }
}

import {
  getNotifications,
} from '../selectors/notifications';

const mapStateToProps = state => ({
  notifications: getNotifications(state),
});

import {
  bootstrap,
  cleanUp,
  onSectorChange,
} from '../actions/bootstrap';

const mapDispatchToProps = {
  bootstrap,
  cleanUp,
  onSectorChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);

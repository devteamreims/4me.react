import React, { Component } from 'react';
import { connect } from 'react-redux';

class RoomStatus extends Component {

  render() {
    const {
      openedCwpCount,
      ...other
    } = this.props;

    return (
      <div {...other}>
        <p>Total : {openedCwpCount}</p>
      </div>
    );
  }
}


import {
  getOpenedCwpCount,
} from '../selectors/map';

const mapStateToProps = (state) => {
  const openedCwpCount = getOpenedCwpCount(state);

  return {
    openedCwpCount,
  };
};

export default connect(mapStateToProps)(RoomStatus);

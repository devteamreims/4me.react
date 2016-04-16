import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';



export class SectorCount extends Component {
  render() {
    const {
      openedCwpsCount,
    } = this.props;


    const styles = {
      fontSize: 50,
      fontWeight: 'bold',
      color: this.context.muiTheme.baseTheme.palette.textColor,
    };

    return (
      <span style={styles}>
        {openedCwpsCount}
      </span>
    );
  }
}

SectorCount.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

import {
  getOpenedCwpCount,
} from '../selectors/map';

const mapStateToProps = (state) => {
  const openedCwpsCount = getOpenedCwpCount(state);

  return {
    openedCwpsCount,
  };
};

export default connect(mapStateToProps)(SectorCount);

import React, { Component } from 'react';

import MenuItem from 'material-ui/MenuItem';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  container: {
    textAlign: 'center',
    display: 'block',
  },
  refresh: {
    position: 'relative',
    margin: '0 auto',
  }
};

class Spinner extends Component {
  /*
   * mui AutoComplete tries to wrap 'value' in a <MenuItem > component
   * unless value is already a MenuItem or a Divider
   */
  static muiName = MenuItem.muiName;

  render() {
    const {
      show,
    } = this.props;

    if(!show) {
      return null;
    }

    return (
      <MenuItem
        disabled={true}
        style={style.container}
      >
        <RefreshIndicator
          left={0}
          top={0}
          status={show && 'loading'}
          style={style.refresh}
        />
      </MenuItem>
    );
  }
}

export default Spinner;

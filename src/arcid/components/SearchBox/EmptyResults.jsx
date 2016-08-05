import React, { Component } from 'react';

import MenuItem from 'material-ui/MenuItem';

class EmptyResults extends Component {
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
      >
        <i>Nothing found ...</i>
      </MenuItem>
    );
  }
}

export default EmptyResults;

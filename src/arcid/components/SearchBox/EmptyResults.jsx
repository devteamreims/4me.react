import React, { Component } from 'react';

import MenuItem from 'material-ui/MenuItem';

import {pure} from 'recompose'

class EmptyResults extends Component {
  /*
   * mui AutoComplete tries to wrap 'value' in a <MenuItem > component
   * unless value is already a MenuItem or a Divider
   */
  static displayName = 'MenuItem';

  constructor(props) {
    super(props);

    this.props = {
      show: true,
    };
  }

  render() {
    const {
      show,
    } = this.props;

    if(show) {
      return (
        <MenuItem
          disabled={true}
        >
          <i>Nothing found ...</i>
        </MenuItem>
      );
    }

    return <span></span>;
  }
}

export default pure(EmptyResults);

import React, { Component } from 'react';

import MenuItem from 'material-ui/lib/menus/menu-item';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';

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

import PureRenderMixin from 'react-addons-pure-render-mixin';

class Spinner extends Component {
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

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }


  render() {
    const {
      show,
    } = this.props;

    if(show) {
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

    return (
      <span></span>
    );

  }
}

export default Spinner;

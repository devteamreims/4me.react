import React, { Component } from 'react';

import MenuItem from 'material-ui/MenuItem';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const styles = {
  container: {
    position: 'relative',
  },
  refresh: {
    position: 'relative',
    margin: '0 auto',
  }
};

import {pure} from 'recompose';

class Spinner extends Component {
  /*
   * mui AutoComplete tries to wrap 'value' in a <MenuItem > component
   * unless value is already a MenuItem or a Divider
   */
  static displayName = 'MenuItem';

  defaultProps = {
    show: false,
  };

  render() {
    const {
      show,
      style = {},
    } = this.props;

    if(show) {
      return (
        <div
          style={Object.assign(styles.container, style)}
        >
          <RefreshIndicator
            left={0}
            top={0}
            status={show && 'loading'}
            style={styles.refresh}
          />
        </div>
      );
    }

    return (
      <span></span>
    );

  }
}

export default pure(Spinner);

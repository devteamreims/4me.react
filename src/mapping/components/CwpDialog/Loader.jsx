import React, { Component } from 'react';

import RefreshIndicator from 'material-ui/RefreshIndicator';

const styles = {
  container: {
    textAlign: 'center',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class Loader extends Component {

  render() {
    const {
      hidden,
    } = this.props;

    if(hidden) {
      return (<span></span>);
    }

    return (
      <div style={styles.container}>
        <RefreshIndicator
          left={0}
          top={0}
          status="loading"
          style={styles.refresh}
        />
      </div>
    );
  }
}

Loader.propTypes = {
  hidden: React.PropTypes.bool,
};

Loader.defaultProps = {
  hidden: false,
};

export default Loader;

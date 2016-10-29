import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';

import {
  enable as enableRedirect,
  disable as disableRedirect,
} from '../actions/returnToDashboard';

class RedirectToDashboard extends Component {
  componentDidMount() {
    const {
      enableRedirect,
    } = this.props;

    enableRedirect();
  }

  componentWillUnmount() {
    const {
      disableRedirect,
    } = this.props;

    disableRedirect();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  enableRedirect,
  disableRedirect,
};

export default connect(null, mapDispatchToProps)(RedirectToDashboard);

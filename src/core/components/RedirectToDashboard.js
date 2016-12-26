// @flow
import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';

import type { Dispatch } from '../../store';

import {
  enable as enableRedirect,
  disable as disableRedirect,
} from '../actions/returnToDashboard';

type Props = {
  enableRedirect: () => *,
  disableRedirect: () => *,
};

class RedirectToDashboard extends Component {
  props: Props;

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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    enableRedirect: () => dispatch(enableRedirect()),
    disableRedirect: () => dispatch(disableRedirect()),
  };
};

export default connect(null, mapDispatchToProps)(RedirectToDashboard);

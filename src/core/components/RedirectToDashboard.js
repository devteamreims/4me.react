// @flow
import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';
import type {
  ConnectedComponentClass,
  MapDispatchToProps,
} from 'react-redux';

import type { Action, Dispatch } from '../../store';

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

const mapDispatchToProps: MapDispatchToProps<Action, {}, Props> = (dispatch: Dispatch) => {
  return {
    enableRedirect: () => dispatch(enableRedirect()),
    disableRedirect: () => dispatch(disableRedirect()),
  };
};

type Export = ConnectedComponentClass<{}, Props, void, void>;
const Ex: Export = connect(null, mapDispatchToProps)(RedirectToDashboard);
export default Ex;

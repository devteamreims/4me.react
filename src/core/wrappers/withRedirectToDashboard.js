import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  enable as enableRedirect,
  disable as disableRedirect,
} from '../actions/returnToDashboard';

import { withRouter } from 'react-router';

export default function withRedirectToDashboard(getShouldEnableRedirection, getTargetRoute) {
  return DecoratedComponent => {

    if(typeof getShouldEnableRedirection !== 'function') {
      throw new Error('withRedirectToDashboard: getShouldEnableRedirection should be a valid state selector');
    }

    if(typeof getTargetRoute !== 'function') {
      throw new Error('withRedirectToDashboard: getTargetRoute should be a valid state selector');
    }

    const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';


    const wrapped = class extends Component {
      static displayName = `withRedirectToDashboard(${displayName})`;

      componentDidMount() {
        const {
          enableRedirect,
          targetRoute,
          shouldEnableRedirection,
        } = this.props;

        if(shouldEnableRedirection) {
          enableRedirect(targetRoute);
        }
      }

      componentDidUpdate(prevProps) {
        const {
          enableRedirect,
          disableRedirect,
          shouldEnableRedirection,
          targetRoute,
        } = this.props;

        if(shouldEnableRedirection) {
          enableRedirect(targetRoute);
        } else {
          disableRedirect();
        }
      }

      componentWillUnmount() {
        const {
          disableRedirect,
        } = this.props;

        disableRedirect();
      }

      _isCurrentRouteIndex() {
        const {
          router,
          targetRoute,
        } = this.props;

        return router.isActive(targetRoute);
      }

      render() {
        const {
          shouldEnableRedirection,
          enableRedirect,
          disableRedirect,
          router,
          targetRoute,
          ...other
        } = this.props;

        return (
          <DecoratedComponent {...other} />
        );
      }
    };

    const mapStateToProps = state => ({
      shouldEnableRedirection: !!getShouldEnableRedirection(state),
      targetRoute: getTargetRoute(state),
    });

    const mapDispatchToProps = {
      enableRedirect,
      disableRedirect,
    };

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(wrapped));
  };
};

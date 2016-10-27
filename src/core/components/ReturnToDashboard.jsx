import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import shallowEqual from 'react-redux/lib/utils/shallowEqual';

import LinearProgress from 'material-ui/LinearProgress';

const initialState = {
  showProgress: false,
  progressPercentage: 0,
};

const refreshInterval = 16;
const percentageThreshold = 0.80; // Progress bar will not be visible before 80% of the timer has passed

class ReturnToDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.refreshInterval = null;
  }

  componentDidMount() {
    this.updateProgress();
    this.refreshInterval = setInterval(this.updateProgress, refreshInterval);
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-unused-vars
    const usedProps = ['returnToDashboardTime', 'redirectEnabled', 'targetRoute'];
    const prepareForComparison = (props) => {
      return {
        ..._.pick(props, ['redirectEnabled', 'targetRoute']),
        returnToDashboardTime: props.returnToDashboardTime && props.returnToDashboardTime.getTime(),
      };
    };

    // Here we extract some props, and decide wether we must reset or timer or not
    if(!shallowEqual(prepareForComparison(nextProps), prepareForComparison(this.props))) {
      clearInterval(this.refreshInterval);
      this.updateProgress();
      this.refreshInterval = setInterval(this.updateProgress, refreshInterval);
    }
  }


  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  updateProgress = () => {
    const {
      returnToDashboardTime,
      lastUserInteraction,
      router,
      targetRoute,
      redirectEnabled,
      disableRedirect,
    } = this.props;

    if(!returnToDashboardTime || !redirectEnabled) {
      return;
    }


    // Present time is after return to dashboard timeout, redirect user
    if(moment().isAfter(returnToDashboardTime)) {
      // Redirect
      router.push(targetRoute || '/');

      this.setState(initialState);

      // Disable future redirect
      if(redirectEnabled) {
        disableRedirect();
      }

      return;
    }


    // Calculate progress to display or not the progress bar
    const interval = moment(returnToDashboardTime).diff(lastUserInteraction);


    const threshold = Math.floor(interval * percentageThreshold);
    const cutOff = moment(lastUserInteraction).add(threshold);

    if(moment().isBefore(cutOff)) {
      // Do not display the bar before threshold is passed
      if(this.state.showProgress) {
        this.setState({showProgress: false});
      }
      return;
    }


    const reducedInterval = moment(returnToDashboardTime).diff(cutOff);
    const advance = moment().diff(cutOff);

    const percentage = Math.floor(100 * advance / reducedInterval);

    this.setState({
      showProgress: true,
      progressPercentage: percentage,
    });
  };

  render() {
    const {
      showProgress,
      progressPercentage,
    } = this.state;

    const {
      redirectEnabled,
    } = this.props;

    if(!showProgress || !redirectEnabled) {
      return null;
    }

    return (
      <LinearProgress
        mode="determinate"
        value={progressPercentage}
      />
    );
  }
}

import {
  getReturnToDashboardTime,
  getLastInteraction,
  isEnabled,
  getTargetRoute,
} from '../selectors/returnToDashboard';

import {
  disable as disableRedirect
} from '../actions/returnToDashboard';

const mapStateToProps = (state) => {
  return {
    returnToDashboardTime: getReturnToDashboardTime(state),
    lastUserInteraction: getLastInteraction(state),
    targetRoute: getTargetRoute(state),
    redirectEnabled: isEnabled(state),
  };
};

const mapDispatchToProps = {
  disableRedirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ReturnToDashboard));

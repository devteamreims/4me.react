// @flow
import React, { Component } from 'react';
// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import shallowEqual from 'react-redux/lib/utils/shallowEqual';

import LinearProgress from 'material-ui/LinearProgress';

type Props = {
  returnToDashboardTime: Date,
  lastUserInteraction: Date,
  targetRoute: string,
  redirectEnabled: boolean,
  disableRedirect: () => *,
};

type State = {
  showProgress: boolean,
  triggerRedirect: boolean,
  progressPercentage: number,
};

class ReturnToDashboard extends Component {
  props: Props;
  intervalId: ?number;
  refreshInterval: number;
  percentageThreshold: number;
  state: State;

  static contextTypes = {
    router: React.PropTypes.any.isRequired,
  };

  constructor(props: Props) {
    super(props);

    this.state = this._getInitialState();
    this.intervalId = null;
    this.refreshInterval = 100; // Autoupdate this component every 100ms
    this.percentageThreshold = 0.80; // Progress bar will not be visible before 80% of the timer has passed
  }

  _getInitialState = () => ({ // eslint-disable-line react/sort-comp
    showProgress: false,
    triggerRedirect: false,
    progressPercentage: 0,
  });

  componentDidMount() {
    this.updateProgress();
    this.intervalId = setInterval(this.updateProgress, this.refreshInterval);
  }

  componentWillReceiveProps(nextProps) {
    const prepareForComparison = (props) => {
      return {
        ..._.pick(props, ['redirectEnabled', 'targetRoute']),
        returnToDashboardTime: props.returnToDashboardTime && props.returnToDashboardTime.getTime(),
      };
    };

    // Here we extract some props, and decide wether we must reset or timer or not
    if(!shallowEqual(prepareForComparison(nextProps), prepareForComparison(this.props))) {
      if(this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.updateProgress();
      this.intervalId = setInterval(this.updateProgress, this.refreshInterval);
    }
  }


  componentWillUnmount() {
    if(this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateProgress = () => {
    const {
      returnToDashboardTime,
      lastUserInteraction,
      targetRoute,
      redirectEnabled,
      disableRedirect,
    } = this.props;

    const {
      router,
    } = this.context;

    if(!returnToDashboardTime || !redirectEnabled) {
      return;
    }

    if(moment().isAfter(returnToDashboardTime)) {
      router.transitionTo(targetRoute);
      this.setState({showProgress: false});
      disableRedirect();
      return;
    }

    // Calculate progress to display or not the progress bar
    const interval = moment(returnToDashboardTime).diff(lastUserInteraction);


    const threshold = Math.floor(interval * this.percentageThreshold);
    const cutOff = moment(lastUserInteraction).add(threshold);

    if(moment().isBefore(cutOff)) {
      // Do not display the bar before threshold is passed
      this.setState({showProgress: false});
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

import type {
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';

import {
  getReturnToDashboardTime,
  getLastInteraction,
  isEnabled,
  getTargetRoute,
} from '../selectors/returnToDashboard';

import {
  disable as disableRedirect
} from '../actions/returnToDashboard';

const mapStateToProps: MapStateToProps<*, {}, *> = (state) => {
  return {
    returnToDashboardTime: getReturnToDashboardTime(state),
    lastUserInteraction: getLastInteraction(state),
    targetRoute: '/' || getTargetRoute(state),
    redirectEnabled: isEnabled(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<*, {}, *> = {
  disableRedirect,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnToDashboard);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import FilterControl from './FilterControl';
import SupervisorControl from './SupervisorControl';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  element: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
    maxWidth: 700,
  },
};


class FlightListControls extends Component {

  handleFilterChange = (event, value) => {
    const {
      setFilter,
      selectedFilter,
    } = this.props;

    if (value === selectedFilter) {
      return;
    }

    setFilter(value);
  };

  handleForceOff = (fetcher, event, value) => {
    const {
      toggleForceOff,
    } = this.props;

    return toggleForceOff(fetcher, value);
  };

  handleForceMcs = (fetcher, event, value) => {
    const {
      toggleForceMcs,
    } = this.props;

    return toggleForceMcs(fetcher, value);
  };


  render() {
    const {
      showSupervisorControl,
      showFilterControl,
      selectedFilter,
      isLoading,
      fetchers,
    } = this.props;

    if(!showFilterControl && !showSupervisorControl) {
      return null;
    }


    return (
      <div style={style.container}>
        {showFilterControl &&
          <FilterControl
            style={style.element}
            onChange={this.handleFilterChange}
            selected={selectedFilter}
            disabled={isLoading}
          />
        }
        {showSupervisorControl &&
          <SupervisorControl
            style={style.element}
            fetchers={fetchers}
            handleForceOff={this.handleForceOff}
            handleForceMcs={this.handleForceMcs}
          />
        }
      </div>
    );
  }
}

import {
  getFilter,
} from '../../selectors/list-filter';

import {
  isLoading,
} from '../../selectors/flight-list';

import {
  setFilter,
} from '../../actions/list-filter';

import {
  getFetchersStatuses,
} from '../../selectors/status';

import {
  toggleForceOff,
  toggleForceMcs,
} from '../../actions/fetcher-status';


const mapStateToProps = (state) => {
  const fetchers = _.mapValues(getFetchersStatuses(state), f => _.pick(f, ['forceMcs', 'forceOff']));

  return {
    selectedFilter: getFilter(state),
    isLoading: isLoading(state),
    fetchers,
  };
};

const mapDispatchToProps = {
  setFilter,
  toggleForceOff,
  toggleForceMcs,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightListControls);

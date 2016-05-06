import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    } = this.props;

    console.log('handleFilterChange !!!');
    console.log(value);
    console.log(setFilter);

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
      hasSudoPower,
      showExtendedControls,
      selectedFilter,
      setFilter,
      isLoading,
      fetchers,
      ...other,
    } = this.props;

    console.log(fetchers);


    return (
      <div style={style.container}>
        {showExtendedControls &&
          <FilterControl
            style={style.element}
            onChange={this.handleFilterChange}
            selected={selectedFilter}
            disabled={isLoading}
          />
        }
        {hasSudoPower &&
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
  shouldShowFilters,
  getFilter,
} from '../../selectors/list-filter';

import {
  isLoading,
} from '../../selectors/flight-list';

import {
  isSupervisor,
} from '../../../core/selectors/cwp';

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
    showExtendedControls: shouldShowFilters(state),
    hasSudoPower: isSupervisor(state) || process.env.NODE_ENV === 'development',
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

import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import AutoComplete from './CustomAutoComplete';
import IconButton from 'material-ui/lib/icon-button';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import RefreshIcon from 'material-ui/lib/svg-icons/navigation/refresh';
import ClearIcon from 'material-ui/lib/svg-icons/content/clear';

import AutoCompleteFlight from './AutoCompleteFlight';
import Spinner from './Spinner';
import EmptyResults from './EmptyResults';

import theme from '../../../theme';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  underlineStyle: {
    borderColor: theme.palette.accent1Color,
  },
};

class SearchBox extends Component {

  constructor(props) {
    super(props);
  }

  handlePerformQuery = (event) => {
    const {
      isLoading,
      startQuery,
      searchString,
      clearSearch,
      showResults,
    } = this.props;

    if(isLoading || !searchString) {
      return;
    }

    console.log(`Starting query for ${searchString}`);

    clearSearch();
    startQuery(searchString);
    showResults();
  };

  handleUpdateInput = (searchString, dataSource) => {
    const {
      startSearch,
      clearSearch,
    } = this.props;


    if(searchString === '') {
      clearSearch();
    } else {
      startSearch(searchString);
    }

  };

  handleNewRequest = (flight, index) => {
    const {
      clearSearch,
      clearQuery,
      showHistory,
      getProfile,
    } = this.props;

    if(index === -1) {
      console.log('Enter key pressed !');
      this.handlePerformQuery();
      return;
    }

    console.log(`IfplId selected !`);
    console.log(flight.ifplId);

    getProfile(flight);

    clearSearch();
    clearQuery();
    showHistory();
  };

  handleOnFocus = (event) => {
    const {
      clearSearch,
      clearQuery,
    } = this.props;

    clearSearch();
  };

  render() {
    const {
      flights,
      isAutocompleteLoading,
      isQueryLoading,
      isLoading,
      clearQuery,
      searchString,
      showClearResultsButton,
      ...other,
    } = this.props;


    let dataSource = [];
    if(isLoading) {
      const spinner = {
        text: 'spinner',
        value: (
          <Spinner show={isAutocompleteLoading}/>
        ),
      };

      dataSource = [spinner];
    } else {
      if(_.isEmpty(flights)) {
        const emptyResults = {
          text: 'empty-results',
          value: (
            <EmptyResults show={_.isEmpty(flights)} />
          ),
        };

        dataSource = [emptyResults];
      } else {
        const processedFlights = _.map(flights, flight => {
          const {
            callsign,
            ifplId,
            departure,
            destination,
            eobt,
          } = flight;

          return {
            text: callsign,
            value: (
              <AutoCompleteFlight
                callsign={callsign}
                departure={departure}
                destination={destination}
                eobt={eobt}
                searchString={searchString}
              />
            ),
            ...flight,
          };
        });

        dataSource = [...processedFlights];
      }
    }

    let Button;

    if(isQueryLoading) {
      Button = (
        <IconButton disabled={true}>
          <RefreshIcon />
        </IconButton>
      );
    } else if(showClearResultsButton) {
      Button = (
        <IconButton
          onClick={clearQuery}
        >
          <ClearIcon />
        </IconButton>
      );
    } else {
      Button = (
        <IconButton
          onClick={this.handlePerformQuery}
        >
          <SearchIcon />
        </IconButton>
      );
    }

    return (
      <div style={style.container}>
        <AutoComplete
          hintText="Search callsign"
          dataSource={dataSource}
          fullWidth={true}
          filter={AutoComplete.noFilter}
          underlineFocusStyle={style.underlineStyle}
          onSubmit={this.handlePerformQuery}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          onFocus={this.handleOnFocus}
          searchText={searchString}
          menuCloseDelay={100}
          disabled={isQueryLoading || showClearResultsButton}
        />
        {Button}
      </div>
    );
  }
}

import {
  isLoading as isAutocompleteLoading,
  getFlights as getAutocompleteFlights,
  getQuery as getAutocompleteString,
} from '../../selectors/autocomplete';

import {
  isLoading as isQueryLoading,
  getFlights as getQueryFlights,
  getQueryCallsign as getQueryString,
} from '../../selectors/query';

const emptyFlights = [];

const mapStateToProps = (state) => {
  const flights = getAutocompleteFlights(state);

  const searchString = getAutocompleteString(state) || getQueryString(state);

  const querySearchString = getQueryString(state);

  const showClearResultsButton = querySearchString || !_.isEmpty(getQueryFlights(state));

  return {
    flights,
    isAutocompleteLoading: isAutocompleteLoading(state),
    isQueryLoading: isQueryLoading(state),
    isLoading: isQueryLoading(state) || isAutocompleteLoading(state),
    searchString,
    showClearResultsButton,
  };
};

import {
  startSearch,
  clearSearch,
} from '../../actions/autocomplete';

import {
  startQuery,
  clearQuery,
} from '../../actions/query';

import {
  showResults,
  showHistory,
} from '../../actions/resultTabs';

import {
  getProfile,
} from '../../actions/profile';

const mapDispatchToProps = {
  startSearch,
  clearSearch,
  startQuery,
  clearQuery,
  showResults,
  showHistory,
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);

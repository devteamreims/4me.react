import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

// import AutoComplete from './CustomAutoComplete';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import ClearIcon from 'material-ui/svg-icons/content/clear';

import AutoCompleteFlight from './AutoCompleteFlight';
import Spinner from './Spinner';
import EmptyResults from './EmptyResults';

import MenuItem from 'material-ui/MenuItem';

import theme from '../../../theme';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  underlineStyle: {
    borderColor: theme.palette.accent1Color,
  },
  listStyle: {
    backgroundColor: 'black',
  },
};

class SearchBox extends Component {
  handlePerformQuery = (event) => { // eslint-disable-line no-unused-vars
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

  handleUpdateInput = (searchString, dataSource) => { // eslint-disable-line no-unused-vars
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
      onNewRequest,
    } = this.props;

    if(index === -1) {
      console.log('Enter key pressed !');
      this.handlePerformQuery();
      return;
    }

    if(onNewRequest) {
      onNewRequest();
    }

    console.log('IfplId selected !');
    console.log(flight.ifplId);

    getProfile(flight);

    clearSearch();
    clearQuery();
    showHistory();
  };

  handleOnFocus = (event) => { // eslint-disable-line no-unused-vars
    const {
      clearSearch,
    } = this.props;

    clearSearch();
  };

  handleOnBlur = (event) => { // eslint-disable-line no-unused-vars
    this.setState({isFocused: false});
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
    } = this.props;


    let dataSource = [];
    if(isLoading) {
      const spinner = {
        text: 'spinner',
        value: (
          <Spinner show={isAutocompleteLoading} />
        ),
      };

      dataSource = [spinner];
    } else {
      if(_.isEmpty(flights) && searchString) {
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
            departure,
            destination,
            eobt,
          } = flight;

          return {
            text: callsign,
            value: (
              <MenuItem
                style={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  lineHeight: '20px',
                }}
              >
                <AutoCompleteFlight
                  callsign={callsign}
                  departure={departure}
                  destination={destination}
                  eobt={eobt}
                  searchString={searchString}
                />
              </MenuItem>
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
          animated={true}
          filter={AutoComplete.noFilter}
          listStyle={style.listStyle}
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

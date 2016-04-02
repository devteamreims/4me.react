import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import AutoComplete from 'material-ui/lib/auto-complete';
import IconButton from 'material-ui/lib/icon-button';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import RefreshIcon from 'material-ui/lib/svg-icons/navigation/refresh';

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
    borderColor: theme.palette.accent2Color,
  },
};

class SearchBox extends Component {

  constructor(props) {
    super(props);
  }

  handleUpdateInput = _.debounce((searchString, dataSource) => {
    const {
      startSearch,
      clearSearch,
    } = this.props;

    if(searchString === '') {
      clearSearch();
    } else {
      startSearch(searchString);
    }
  }, 200);

  handleNewRequest = (item) => {
    const {
      clearSearch,
    } = this.props;

    console.log(`IfplId selected !`);
    console.log(item.ifplId);

    clearSearch();

    this.clearTimeout = setTimeout(() => {
      clearSearch()
      clearTimeout(this.clearTimeout)
    }, 2000);
  };

  handleOnFocus = (event) => {
    const {
      clearSearch,
    } = this.props;

    clearSearch();
  };


  render() {
    const {
      flights,
      isAutocompleteLoading,
      searchString,
      ...other,
    } = this.props;

    let dataSource = [];
    if(searchString === '') {
      undefined;
    } else if(isAutocompleteLoading) {
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
            ifplId,
            value: (
              <AutoCompleteFlight
                callsign={callsign}
                departure={departure}
                destination={destination}
                eobt={eobt}
                searchString={searchString}
              />
            ),
          };
        });

        dataSource = [...processedFlights];
      }
    }

    let Button;

    if(isAutocompleteLoading) {
      Button = (
        <IconButton disabled={true}>
          <RefreshIcon />
        </IconButton>
      );
    } else {
      Button = (
        <IconButton>
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
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          onFocus={this.handleOnFocus}
          searchText={searchString}
          menuCloseDelay={2000}
        />
        {Button}
      </div>
    );
  }
}

import {
  isLoading as isAutocompleteLoading,
  getFlights,
  getQuery,
} from '../../selectors/autocomplete';

const mapStateToProps = (state) => {
  return {
    flights: getFlights(state),
    isAutocompleteLoading: isAutocompleteLoading(state),
    searchString: getQuery(state),
  };
};

import {
  startSearch,
  clearSearch,
} from '../../actions/autocomplete';

const mapDispatchToProps = {
  startSearch,
  clearSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);

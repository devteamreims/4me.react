// @flow
import React, { Component } from 'react';

import { connect } from 'react-redux';

import Redirect from 'react-router/Redirect';
import Widget from '../../../../core/components/Dashboard/Widget';

import WidgetSearchBar from './SearchBar';
import WidgetSearchResults from './SearchResults';

type StateProps = {
  isErrored: boolean,
};

type Props = StateProps & {
  increment: void => void,
  decrement: void => void,
  cols: number,
  counter: number,
  pathName: string,
};

type State = {
  shouldTransition: boolean,
};

class WidgetComponent extends Component {
  props: Props;
  state: State;

  constructor(props) {
    super(props);

    this.state = {
      shouldTransition: false,
    };
  }

  handleClickOnFlight = () => {
    this.setState({shouldTransition: true});
  }

  render() {
    const {
      cols,
      pathName,
      isErrored,
    } = this.props;

    const {
      shouldTransition,
    } = this.state;

    if(shouldTransition) {
      return (
        <Redirect to={pathName} />
      );
    }

    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      overflow: 'auto',
    };

    return (
      <Widget
        cols={cols}
        title="ETFMS PROFILE"
        linkTo={pathName}
      >
        <div
          style={containerStyle}
        >
          {isErrored ? (
            <h3>ETFMS PROFILE is unavailable !</h3>
          ) : ([
            <WidgetSearchBar
              key="search-bar"
              onClickOnFlight={this.handleClickOnFlight}
            />,
            <WidgetSearchResults
              key="search-results"
              onClickOnFlight={this.handleClickOnFlight}
            />,
          ])}
        </div>
      </Widget>
    );
  }
}

import {
  isErrored,
} from '../../selectors/status';

const mapStateToProps = (state) => {
  return {
    isErrored: isErrored(state),
  };
};

export default connect(mapStateToProps)(WidgetComponent);

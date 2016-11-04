import React, { Component } from 'react';

import { connect } from 'react-redux';

import Redirect from 'react-router/Redirect';
import Widget from '../../../core/components/Dashboard/Widget';

import WidgetSearchBar from './SearchBar';
import WidgetSearchResults from './SearchResults';

class WidgetComponent extends Component {
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
      >
        <div
          style={containerStyle}
        >
          {isErrored ? (
            <h3>ETFMS PROFILE is unavailable !</h3>
          ) : ([
            <WidgetSearchBar onClickOnFlight={this.handleClickOnFlight} />,
            <WidgetSearchResults onClickOnFlight={this.handleClickOnFlight} />
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

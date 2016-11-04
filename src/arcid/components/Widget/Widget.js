import React, { Component } from 'react';


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
          <WidgetSearchBar onClickOnFlight={this.handleClickOnFlight} />
          <WidgetSearchResults onClickOnFlight={this.handleClickOnFlight} />
        </div>
      </Widget>
    );
  }
}

export default WidgetComponent;

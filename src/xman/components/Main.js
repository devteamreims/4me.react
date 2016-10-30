import React, { Component } from 'react';

import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';

import FlightList from './FlightList';
import FlightListControls from './FlightListControls';
import StatusMessage from './StatusMessage';


class XmanRoot extends Component {
  render() {
    const {
      shouldDisplayMessage,
      shouldDisplayList,
    } = this.props;

    return (
      <div>
        <FlightListControls />
        <Divider />
        {shouldDisplayMessage && [
          <StatusMessage
            key={0}
            style={{textAlign: 'center', margin: 0, padding: 10}}
          />,
          <Divider
            key={1}
          />,
        ]
        }
        {shouldDisplayList && <FlightList />}
      </div>
    );
  }
}

import {
  shouldDisplayMessage,
  shouldDisplayList,
} from '../selectors/status';

const mapStateToProps = (state) => ({
  shouldDisplayMessage: shouldDisplayMessage(state),
  shouldDisplayList: shouldDisplayList(state),
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(XmanRoot);

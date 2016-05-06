import React, { Component } from 'react';

import { connect } from 'react-redux';

import _ from 'lodash';

import Divider from 'material-ui/lib/divider';

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

const mapStateToProps = (state) => {
  return {
    shouldDisplayMessage: shouldDisplayMessage(state),
    shouldDisplayList: shouldDisplayList(state),
  };
};

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(XmanRoot);

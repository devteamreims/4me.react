import React, { Component } from 'react';

import { connect } from 'react-redux';

import _ from 'lodash';

import FlightList from './FlightList';
import FlightListControls from './FlightListControls';

class XmanRoot extends Component {
  render() {
    return (
      <div>
        <FlightListControls />
        <FlightList />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(XmanRoot);

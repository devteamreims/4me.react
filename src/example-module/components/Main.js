import React from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import RedirectToDashboard from '../../core/components/RedirectToDashboard';

import {
  increment,
  decrement,
} from '../actions';

export const Main = ({
  counter = 0,
  increment,
  decrement,
}) => (
  <div>
    <RedirectToDashboard />
    <span>This is an example module !</span>
    <br />
    <input type="text" />
    <br />
    <span>Counter is {counter}</span>
    <br />
    <button onClick={increment}>MORE</button>
    <button onClick={decrement}>LESS</button>
  </div>
);

import { p } from '../selectors';

const mapStateToProps = (state) => {
  const ourState = p(state);

  return {
    counter: R.prop('counter', ourState),
  };
};

const mapDispatchToProps = {
  increment,
  decrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

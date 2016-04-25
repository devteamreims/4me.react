import { combineReducers } from 'redux';

import socket from './socket';
import flightList from './flight-list';
import fetcherServices from './fetcher-services';

const statusReducer = combineReducers({
  socket,
  flightList,
  fetcherServices,
});

export default statusReducer;

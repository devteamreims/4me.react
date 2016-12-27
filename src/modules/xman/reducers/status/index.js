import { combineReducers } from 'redux';

import socket from './socket';
import flightList from './flight-list';
import fetcherServices from './fetcher-services';
import positionService from './position-service';

const statusReducer = combineReducers({
  socket,
  flightList,
  fetcherServices,
  positionService,
});

export default statusReducer;

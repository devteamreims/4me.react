import {
  socketConnected,
  socketDisconnected,
} from '../actions/socket';

import _ from 'lodash';

let mySocket;

// Global socketIo object event handler
export function setupSocketIo(dispatch, socketIo) {
  console.log('Initializing socket.io');

  if(mySocket) {
    console.log('xman/socket: Trying to reattach handlers on an existing socket');
    return;
  }

  mySocket = socketIo;

  socketIo.on('connect', (socket) => { // eslint-disable-line no-unused-vars
    console.log('Connected to server !');
    dispatch(socketConnected());
  });

  socketIo.on('disconnect', (socket) => dispatch(socketDisconnected())); // eslint-disable-line no-unused-vars

  attachHandlerToSocket(dispatch, socketIo);

  return mySocket;
}


export function getSocket() {
  return mySocket;
}

export function setSubscriptionFilter(data) {
  const {
    sectors = [],
  } = data;

  let { verticalFilter } = data;

  const socket = getSocket();

  if(!socket || !socket.emit) {
    console.error('xmanSocket: setSubscriptionFilter: Socket is undefined !!');
    return;
  }

  if(_.isEmpty(sectors)) {
    verticalFilter = false;
  }

  if(socket && socket.emit) {
    console.log('Changing socket subscription !');
    console.log({sectors, verticalFilter});
    socket.emit('set_subscription_filter', {sectors, verticalFilter});
  }
}

export function sendXmanAction(ifplId, status) {
  const socket = getSocket();

  if(!socket || !socket.emit) {
    console.error('xmanSocket: sendXmanAction: Socket is undefined !!');
    return;
  }

  console.log(`Socket: Updating flight with id ${ifplId}`);
  const data = Object.assign({}, {ifplId, flightId: ifplId}, status);

  console.log(data);

  socket.emit('set_action', data);
}

import {
  complete,
  updateFlight,
} from '../actions/flight-list';

import {
  setStatus,
} from '../actions/backend-status';

export function attachHandlerToSocket(dispatch, socket) {
  socket.on('update_flights', (data) => {
    dispatch(complete(data));
  });

  socket.on('update_flight', (data) => {
    const flight = _.cloneDeep(data);
    dispatch(updateFlight(flight));
  });

  socket.on('update_status', data => {
    dispatch(setStatus(data));
  });
}

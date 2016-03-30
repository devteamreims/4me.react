import {
  socketConnected,
  socketDisconnected,
} from '../actions/socket';

import _ from 'lodash';

let mySocket;

// Global socketIo object event handler
export function setupSocketIo(dispatch, socketIo) {
  console.log('Initializing socket.io');

  mySocket = socketIo;

  socketIo.on('connect', function(socket) {
    console.log('Connected to server !');
    dispatch(socketConnected());
  });

  socketIo.on('disconnect', (socket) => dispatch(socketDisconnected()));

  attachHandlerToSocket(dispatch, socketIo);

  return mySocket;
}


export function getSocket() {
  return mySocket;
}

export function setSubscriptionFilter(data) {
  let {sectors = [], verticalFilter = false} = data;

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
  socket.emit('set_action', Object.assign({}, {ifplId}, status));

}

import {
  complete,
  updateFlight
} from '../actions/flight-list';

export function attachHandlerToSocket(dispatch, socket) {

  socket.on('update_flights', (data) => {
    console.log('XMAN Socket: UPDATE_FLIGHTS');
    console.log(data);

    dispatch(complete(data));
  });

  socket.on('update_flight', (data) => {
    console.log('XMAN Socket: UPDATE_FLIGHT');
    console.log(data);
    const flight = _.cloneDeep(data);

    console.log(flight);

    dispatch(updateFlight(flight));
  });

}

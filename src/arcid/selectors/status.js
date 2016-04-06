import _ from 'lodash';
import p from './prefix';

const defaultSocketStatus = {
  status: 'normal',
  name: 'ARCID Socket',
  description: 'Realtime socket connection to ARCID backend',
};


const getSocketStatus = (state) => {
  const isSocketConnected = _.get(p(state), 'socket.connected');

  if(isSocketConnected) {
    return defaultSocketStatus;
  } else {
    return Object.assign({}, defaultSocketStatus, {
      status: 'critical',
      description: 'Could not connect to ARCID websocket backend',
    });
  }
};

export const getStatus = (state) => {
  const items = [
    getSocketStatus(state),
  ];

  return {
    status: 'normal',
    items,
  };
};

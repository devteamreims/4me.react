import _ from 'lodash';
import p from './prefix';

export const getRaw = (state) => _.get(p(state), 'status', {});

import {
  maxStatus,
} from '../../core/selectors/status';

const defaultSocketStatus = {
  status: 'normal',
  name: 'ARCID Socket',
  description: 'Realtime socket connection to ARCID backend',
};

const isSocketConnected = (state) => !!_.get(getRaw(state), 'socket.connected', false);

const getSocketStatus = (state) => {
  if(isSocketConnected(state)) {
    return defaultSocketStatus;
  }

  return Object.assign({}, defaultSocketStatus, {status: 'critical'});
}

export const getStatus = (state) => {
  const items = [
    getSocketStatus(state),
  ];

  return {
    status: maxStatus(_.map(items, item => item.status)),
    items,
  };
};

export const isErrored = (state) => {
  return _.get(getStatus(state), 'status') === 'critical';
};

import _ from 'lodash';
import p from './prefix';

export const getRaw = (state) => _.get(p(state), 'status', {});

const getSocketStatus = (state) => ({
  status: 'normal',
  name: 'MAPPING Socket',
  description: 'Realtime socket connection to mapping backend',
});

export const getStatus = (state) => {
  const items = [
    getSocketStatus(state),
  ];

  return {
    status: 'normal',
    items,
  };
};

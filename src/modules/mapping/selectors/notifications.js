import _ from 'lodash';

import {
  getMap,
} from './map';

export const getBoundCwpCount = (state) => _.size(
  _(getMap(state))
    .reject(getMap(state), mapItem => _.isEmpty(mapItem.sectors))
    .value()
);

export const getNotifications = (state) => {
  const count = getBoundCwpCount(state);

  return {
    count,
    priority: 'info',
  };
};

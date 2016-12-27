import _ from 'lodash';

import {
  getFlights,
} from './flight-list';

import {
  hasPendingAction,
} from './flight';

import {
  shouldDisplayList,
} from './status';

export function getNotifications(state) {
  // No point displaying notifications if the list is hidden for technical reasons
  const pendingActionCount = shouldDisplayList(state) ?
    _.size(_.filter(getFlights(state), flight => hasPendingAction(state, flight.ifplId))) :
    0;

  return {
    count: pendingActionCount,
    priority: 'warning',
  };
}

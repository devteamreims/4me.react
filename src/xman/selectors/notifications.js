import _ from 'lodash';

import {
  getFlights,
} from './flight-list';

import {
  hasPendingAction,
} from './flight';

export function getNotifications(state) {
  const pendingActionCount = _.size(_.filter(getFlights(state), flight => hasPendingAction(state, flight.ifplId)));

  return {
    count: pendingActionCount,
    priority: 'info',
  };
}

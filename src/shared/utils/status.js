// @flow
import _ from 'lodash';

import type {
  StatusLevel,
} from '../types/status';

export function maxStatus(items: Array<StatusLevel>): StatusLevel {
  const reduceStatus = (prev: StatusLevel, current: StatusLevel): StatusLevel => {
    if(current === 'critical' || prev === 'critical' || current === 'error' || prev === 'error') {
      return 'critical';
    }

    if(current === 'warning' || prev === 'warning') {
      return 'warning';
    }

    return 'normal';
  };

  return _.reduce(items, reduceStatus);
}

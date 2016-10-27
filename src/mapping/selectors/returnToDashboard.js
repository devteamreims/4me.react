import _ from 'lodash';

import {
  isNormalCwp,
} from '../../core/selectors/cwp';

import {
  isCwpEmpty,
} from '../../core/selectors/sector';

import {
  getNotifications as getXmanNotifications,
} from '../../xman/selectors/notifications';


// Redirect from mapping to dashboard if :
// * Normal CWP
// * With sectors
// * With XMAN notification

export const shouldRedirectToDashboard = (state) => {
  if(isNormalCwp(state)) {
    return !isCwpEmpty(state) && _.get(getXmanNotifications(state), 'count', 0);
  }

  return false;
};

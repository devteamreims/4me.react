import {
  isNormalCwp,
  isFmp,
  isSupervisor,
} from '../../core/selectors/cwp';

import {
  isCwpEmpty,
} from '../../core/selectors/sector';

import {
  getNotifications as getXmanNotifications,
} from '../../xman/selectors/notifications';


// Redirect from arcid to dashboard if :
// * Normal CWP
//  * With sectors
//  * With XMAN notification
// OR FMP
// OR SPVR

export const shouldRedirectToDashboard = (state) => {
  if(isNormalCwp(state)) {
    return !isCwpEmpty(state) && _.get(getXmanNotifications(state), 'count', 0);
  }

  return isFmp(state) || isSupervisor(state);
}


import {
  isNormalCwp,
  isFmp,
  isSupervisor,
} from '../../core/selectors/cwp';

import {
  isCwpEmpty,
} from '../../core/selectors/sector';


// Redirect from xman to dashboard if :
// * FMP
// OR SPVR

export const shouldRedirectToDashboard = (state) => {
  return isFmp(state) || isSupervisor(state);
}


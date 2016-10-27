import {
  isFmp,
  isSupervisor,
} from '../../core/selectors/cwp';

// Redirect from xman to dashboard if :
// * FMP
// OR SPVR

export const shouldRedirectToDashboard = (state) => {
  return isFmp(state) || isSupervisor(state);
};

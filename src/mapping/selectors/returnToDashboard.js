import {
  isNormalCwp,
} from '../../core/selectors/cwp';

import {
  isCwpEmpty,
} from '../../core/selectors/sector';


export const shouldRedirectToDashboard = (state) => isNormalCwp(state) && !isCwpEmpty(state);

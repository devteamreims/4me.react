export const OPEN = 'mapping/dialog/OPEN';
export const CLOSE = 'mapping/dialog/CLOSE';

import {
  getCwpById,
} from '../selectors/cwp';

import _ from 'lodash';

export function open(cwpId) {
  return (dispatch, getState) => {
    const cwp = getCwpById(getState(), cwpId);

    if(_.isEmpty(cwp)) {
      console.log('mapping/dialog: Cannot open dialog on unknown CWP');
      return;
    }

    return dispatch({
      type: OPEN,
      cwpId,
    });
  };
}


export function close() {
  return {
    type: CLOSE,
  };
}

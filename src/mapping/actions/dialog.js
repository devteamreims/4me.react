export const OPEN = 'mapping/dialog/OPEN';
export const CLOSE = 'mapping/dialog/CLOSE';

import {
  getCwpById,
  isDisabled as isCwpDisabled,
} from '../selectors/cwp';

export function open(cwpId) {
  return (dispatch, getState) => {
    const cwp = getCwpById(getState(), cwpId);

    if(_.isEmpty(cwp)) {
      console.log('mapping/dialog: Cannot open dialog on unknown CWP');
      return;
    }

    if(isCwpDisabled(getState(), cwpId)) {
      console.log(`mapping/dialog: Cannot open dialog on disabled cwp : ${cwpId}`);
      return;
    }

    console.log('Here !!');

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

export const OPEN = 'mapping/dialog/OPEN';
export const CLOSE = 'mapping/dialog/CLOSE';

import { clients } from '../../../shared/env';

export function open(cwpId) {
  return (dispatch) => {
    const client = clients.getClientById(cwpId);

    if(!client || client.type !== 'cwp') {
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

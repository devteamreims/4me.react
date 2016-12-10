export const OPEN = 'mapping/dialog/OPEN';
export const CLOSE = 'mapping/dialog/CLOSE';

import getEnv from '4me.env';
const { getClientById } = getEnv(window.FOURME_CONFIG.FOURME_ENV).clients;

export function open(cwpId) {
  return (dispatch) => {
    const client = getClientById(cwpId);

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

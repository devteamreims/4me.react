
import { fetchCwp } from './cwp';
import { fetchSectorTree } from './sectorTree';
import { fetchSectors } from './sector';
import { connectSocket } from './socket';

import { getCwpId } from '../selectors/cwp';

export function startBootstrap() {
  return (dispatch, getState) => {
    // Start our bootstrap process

    // First, fetch our cwpId and sectorTree
    // Then fetch our sectors and connect to mapping socket
    // Then bootstrap organs

    return Promise.all([
      dispatch(fetchCwp()),
      dispatch(fetchSectorTree()),
    ])
    .then(() => {
      const cwpId = getCwpId(getState());
      console.log(`Fetching sectors for our cwpId ${cwpId}`);
      return Promise.all([
        dispatch(fetchSectors(true)),
        dispatch(connectSocket()),
      ]);
    });

  }
}

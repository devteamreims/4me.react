import { fetchCwp } from './cwp';
import { fetchSectorTree } from './sectorTree';
import { fetchSectors } from './sector';
import { connectSocket, disconnectSocket } from './socket';

export function startBootstrap() {
  return (dispatch) => {
    // Start our bootstrap process

    // First, fetch our cwpId and sectorTree
    return Promise.all([
      dispatch(fetchCwp()),
      dispatch(fetchSectorTree()),
    ])
    // Then fetch our sectors and connect to mapping socket
    .then(() => {
      return Promise.all([
        dispatch(fetchSectors(true)),
        dispatch(connectSocket()),
      ]);
    });
  };
}

export function cleanUp() {
  return (dispatch) => { // eslint-disable-line no-unused-vars
    // TODO: Implement a proper clean up sequence here
    console.log('core/actions/bootstrap: Clean up sequence triggered !');
    return Promise.resolve(dispatch(disconnectSocket()));
  };
}

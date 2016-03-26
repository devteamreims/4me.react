import { refreshCwps } from './cwp';
import { refreshMap } from './map';

export function bootstrap() {
  return (dispatch, getState) => {
    console.log('Bootstrapping MAPPING !!');
    // Fetch CWPs and fetch map

    return Promise.all([
      dispatch(refreshMap()),
      dispatch(refreshCwps()),
    ]);
  };
}

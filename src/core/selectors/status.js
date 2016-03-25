import p from './prefix';
import _ from 'lodash';

//export const getRaw = (state) => _.get(p(state), 'sector', {});

import {
  isConnected,
} from './socket';

export const isNormal = (state) => isConnected(state);
export const isWarning = (state) => false;
export const isErrored = (state) => !isConnected(state);

export const getStatusString = (state) => {
  if(isErrored(state)) {
    return 'error';
  } else if(isWarning(state)) {
    return 'warning';
  } else {
    return 'normal';
  }
};

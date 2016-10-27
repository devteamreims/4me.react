import {
  isLoading as isCwpLoading,
  isErrored as isCwpErrored,
} from './cwp';
import {
  isLoading as isSectorTreeLoading,
  isErrored as isSectorTreeErrored,
} from './sectorTree';
import {
  isBootstrapping as isSectorBootstrapping,
  isErrored as isSectorErrored,
} from './sector';

export const isBootstrapping = (state) => (
  isCwpLoading(state) ||
  isSectorTreeLoading(state) ||
  isSectorBootstrapping(state)
);

export const getBootstrappingString = (state) => {
  if(isCwpLoading(state)) {
    return 'Fetching our CWP ...';
  }
  if(isSectorTreeLoading(state)) {
    return 'Fetching sector tree ...';
  }
  if(isSectorBootstrapping(state)) {
    return 'Fetching our sectors ...';
  }
};

import {
  isConnected,
} from './socket';

export const isErrored = (state) => (
  isCwpErrored(state) ||
  isSectorTreeErrored(state) ||
  isSectorErrored(state) ||
  !isConnected(state)
);


export const getErrorString = (state) => {
  if(isCwpErrored(state)) {
    return 'Error fetching our CWP';
  }

  if(isSectorTreeErrored(state)) {
    return 'Error fetching sector tree';
  }

  if(isSectorErrored(state)) {
    return 'Error fetching our sectors';
  }

  if(!isConnected(state)) {
    return 'Could not connect to mapping backend socket';
  }

  return '';
};

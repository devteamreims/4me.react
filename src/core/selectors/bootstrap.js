// @flow
import {
  isLoading as isCwpLoading,
  isErrored as isCwpErrored,
} from './cwp';

import {
  isBootstrapping as isSectorBootstrapping,
  isErrored as isSectorErrored,
} from './sector';

import type { Selector } from '../../store';

export const isBootstrapping: Selector<boolean> = state => (
  isCwpLoading(state) ||
  isSectorBootstrapping(state)
);

export const getBootstrappingString: Selector<string> = state => {
  if(isCwpLoading(state)) {
    return 'Fetching our CWP ...';
  }

  if(isSectorBootstrapping(state)) {
    return 'Fetching our sectors ...';
  }

  return '';
};

import {
  isConnected,
} from './socket';

export const isErrored: Selector<boolean> = state => (
  isCwpErrored(state) ||
  isSectorErrored(state) ||
  !isConnected(state)
);


export const getErrorString: Selector<string> = state => {
  if(isCwpErrored(state)) {
    return 'Error fetching our CWP';
  }


  if(isSectorErrored(state)) {
    return 'Error fetching our sectors';
  }

  if(!isConnected(state)) {
    return 'Could not connect to mapping backend socket';
  }

  return '';
};

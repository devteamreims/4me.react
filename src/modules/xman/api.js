// @flow
import { get } from 'lodash';
import { getKey } from '../../shared/config';


const xmanUrl = get(getKey('xman'), 'url') ||
  getKey('xman_url') ||
  'http://xman.4me';

export default {
  flights: {
    getAll: `${xmanUrl}/flights`,
  },
  status: {
    getAll: `${xmanUrl}/status`,
    getFetcher: (fetcher: string) => `${xmanUrl}/status/fetchers/${fetcher}`,
    setFetcher: (fetcher: string) => `${xmanUrl}/status/fetchers/${fetcher}`,
  },
  socket: `${xmanUrl}`,
};

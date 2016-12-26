// @flow
import { get } from 'lodash';

if(!window.FOURME_CONFIG) {
  throw new Error('Must have a FOURME_CONFIG variable set ! Please create a config.api.js file');
}

const xmanUrl = get(window.FOURME_CONFIG, 'xman.url') ||
  get(window.FOURME_CONFIG, 'xman_url') ||
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

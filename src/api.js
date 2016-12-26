import { get } from 'lodash';

if(!window.FOURME_CONFIG) {
  throw new Error('Must have a FOURME_CONFIG variable set ! Please create a config.api.js file');
}

const coreMappingUrl = get(window.FOURME_CONFIG, 'core_mapping_url', 'core.mapping.4me');
const mappingUrl = get(window.FOURME_CONFIG, 'mapping_url', 'mapping.4me');
const arcidUrl = get(window.FOURME_CONFIG, 'arcid_url', 'arcid.4me');
const xmanUrl = get(window.FOURME_CONFIG, 'xman_url', 'xman.4me');


const core = {
  mapping: {
    identify: `${coreMappingUrl}/identify`,
    sectors: {
      getMine: (cwpId) => `${coreMappingUrl}/map/${cwpId}`,
    },
  },
  socket: `${coreMappingUrl}`,
};

const arcid = {
  history: `${arcidUrl}/history`,
  autocomplete: (query) => `${arcidUrl}/autocomplete?search=${query}`,
  socket: `${arcidUrl}`,
  searchProfile: `${arcidUrl}/searchProfiles`,
  searchCallsign: `${arcidUrl}/searchFlights`,
};

const xman = {
  xman: {
    getAll: `${xmanUrl}/flights`,
  },
  status: {
    getAll: `${xmanUrl}/status`,
    getFetcher: (fetcher) => `${xmanUrl}/status/fetchers/${fetcher}`,
    setFetcher: (fetcher) => `${xmanUrl}/status/fetchers/${fetcher}`,
  },
  socket: `${xmanUrl}`,
};

const mapping = {
  map: {
    getMap: `${mappingUrl}/map`,
    commit: `${mappingUrl}/map`,
  },
  socket: `${mappingUrl}`,
};

const api = {
  core,
  arcid,
  xman,
  mapping,
};

export default api;

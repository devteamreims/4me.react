import {
  mappingUrl,
  xmanUrl,
  arcidUrl,
} from './api.endpoints';


const core = {
  mapping: {
    cwp: {
      getMine: `${mappingUrl}/cwp/getMine`,
      getSingle: (cwpId) => `${mappingUrl}/cwp/${cwpId}`,
    },
    sectors: {
      getMine: (cwpId) => `${mappingUrl}/mapping/cwp/${cwpId}`,
      getTree: `${mappingUrl}/sectors`,
    },
  },
  socket: `${mappingUrl}`,
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
    getMap: `${mappingUrl}/mapping`,
    commit: `${mappingUrl}/mapping`,
    suggest: (cwpId) => `${mappingUrl}/mapping/cwp/${cwpId}/suggest`,
  },
  cwp: {
    getAll: `${mappingUrl}/cwp`,
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

// @flow
import { get } from 'lodash';

if(!window.FOURME_CONFIG) {
  throw new Error('Must have a FOURME_CONFIG variable set ! Please create a config.api.js file');
}

const etfmsProfileUrl = get(window.FOURME_CONFIG, 'etfmsProfile.url') ||
  get(window.FOURME_CONFIG, 'arcid_url') ||
  'http://etfms-profile.4me';

export default {
  history: `${etfmsProfileUrl}/history`,
  autocomplete: (query: string) => `${etfmsProfileUrl}/autocomplete?search=${query}`,
  socket: `${etfmsProfileUrl}`,
  searchProfile: `${etfmsProfileUrl}/searchProfiles`,
  searchCallsign: `${etfmsProfileUrl}/searchFlights`,
};

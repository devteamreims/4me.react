// @flow
import { get } from 'lodash';
import { getKey } from '../../shared/config';


const etfmsProfileUrl = get(getKey('etfmsProfile'), 'url') ||
  getKey('arcid_url') ||
  'http://etfms-profile.4me';

export default {
  history: `${etfmsProfileUrl}/history`,
  autocomplete: (query: string) => `${etfmsProfileUrl}/autocomplete?search=${query}`,
  socket: `${etfmsProfileUrl}`,
  searchProfile: `${etfmsProfileUrl}/searchProfiles`,
  searchCallsign: `${etfmsProfileUrl}/searchFlights`,
};

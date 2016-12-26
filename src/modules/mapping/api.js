// @flow
import { get } from 'lodash';
import { getKey } from '../../shared/config';


const mappingUrl = get(getKey('mapping'), 'url') ||
  getKey('mapping_url') ||
  'http://mapping.4me';

export default {
  map: {
    getMap: `${mappingUrl}/map`,
    commit: `${mappingUrl}/map`,
  },
  socket: `${mappingUrl}`,
};

// @flow
import { get } from 'lodash';

if(!window.FOURME_CONFIG) {
  throw new Error('Must have a FOURME_CONFIG variable set ! Please create a config.api.js file');
}

const mappingUrl = get(window.FOURME_CONFIG, 'mapping.url') ||
  get(window.FOURME_CONFIG, 'mapping_url') ||
  'http://mapping.4me';

export default {
  map: {
    getMap: `${mappingUrl}/map`,
    commit: `${mappingUrl}/map`,
  },
  socket: `${mappingUrl}`,
};

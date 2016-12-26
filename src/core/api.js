// @flow
import { get } from 'lodash';

if(!window.FOURME_CONFIG) {
  throw new Error('Must have a FOURME_CONFIG variable set ! Please create a config.api.js file');
}

const coreMappingUrl = get(window.FOURME_CONFIG, 'core.mappingUrl') ||
  get(window.FOURME_CONFIG, 'core_mapping_url') ||
  'http://core.mapping.4me';

import type { ClientId } from './types';

export default {
  mapping: {
    identify: `${coreMappingUrl}/identify`,
    sectors: {
      getMine: (clientId: ClientId) => `${coreMappingUrl}/map/${clientId}`,
    },
  },
  socket: `${coreMappingUrl}`,
};

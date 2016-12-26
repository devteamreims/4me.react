// @flow
import { get } from 'lodash';

const coreMappingUrl = get(window.FOURME_CONFIG, 'core.mappingUrl', 'http://core.mapping.4me');

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

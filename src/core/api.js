// @flow
import { getConfig } from './config';


const coreMappingUrl = getConfig().mappingUrl;

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

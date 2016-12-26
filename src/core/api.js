// @flow
import { get } from 'lodash';
import { getKey } from '../shared/config';


const coreMappingUrl = get(getKey('core'), 'mappingUrl') ||
  getKey('core_mapping_url') ||
  'http://core.mapping.4me';

// TODO: Insert deprecation warning here

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

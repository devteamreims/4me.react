// @flow
import { getConfig } from './config';

const mappingUrl = getConfig().url;

export default {
  map: {
    getMap: `${mappingUrl}/map`,
    commit: `${mappingUrl}/map`,
  },
  socket: `${mappingUrl}`,
};

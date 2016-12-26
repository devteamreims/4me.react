// @flow
import { prop } from 'ramda';


export function getKey(key: string): any {
  if(!window.FOURME_CONFIG) {
    throw new Error('Must have a FOURME_CONFIG variable set ! Please create a config.js file');
  }

  return prop(key, window.FOURME_CONFIG);
}

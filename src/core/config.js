// @flow
import { getKey } from '../shared/config';
const name = 'core';

type Config = {
  overrideClientId: boolean | number | string,
  mappingUrl: string,
};

const getDefault = () => ({
  overrideClientId: getKey('overrideCwpId') || false,
  mappingUrl: getKey('core_mapping_url') || 'http://core-mapping.4me',
}: Config);

export function getConfig(): Config {
  return Object.assign({}, getDefault(), getKey(name));
}

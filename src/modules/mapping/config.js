// @flow
import { getKey } from '../../shared/config';
const name = 'mapping';

type Config = {
  disableEmergencyRadios: boolean,
  url: string,
};

const getDefault = () => ({
  disableEmergencyRadios: true,
  url: getKey('mapping_url') || 'http://mapping.4me',
}: Config);

export function getConfig(): Config {
  return Object.assign({}, getDefault(), getKey(name));
}

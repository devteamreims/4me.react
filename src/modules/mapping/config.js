// @flow
import { getKey } from '../../shared/config';
import { name } from './';

const defaultFlags = {
  disableEmergencyRadios: true,
};

export default function getConfig(): typeof defaultFlags {
  return Object.assign({}, defaultFlags, getKey(name));
}

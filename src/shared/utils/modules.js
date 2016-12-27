import R from 'ramda';
import { getKey } from '../config';

export const isModuleDisabled = (name) => {
  if(!name) {
    throw new Error('Please submit a valid name');
  }
  const disabledModules = getKey('disabledModules') || [];
  return R.contains(name, disabledModules);
};

import R from 'ramda';

export const isModuleDisabled = (name) => {
  if(!name) {
    throw new Error('Please submit a valid name');
  }
  const disabledModules = R.propOr([], 'disabledModules', window.FOURME_CONFIG);
  return R.contains(name, disabledModules);
};

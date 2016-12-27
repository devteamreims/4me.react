// TODO: Reimplement backuped radios
const emptyArray = [];

export function getNonBackupedFrequencies() {
  return emptyArray;
}

// TODO: Reimplement backuped radios
export function getAllNonBackupedFrequencies() {
  return emptyArray;

  // return _(getCwps(state))
  //   .map(cwp => _.merge({}, cwp, {nonBackupedFrequencies: getNonBackupedFrequencies(state, cwp.id)}))
  //   .reject(cwp => _.isEmpty(cwp.nonBackupedFrequencies))
  //   .map(cwp => _.pick(cwp, ['id', 'name', 'nonBackupedFrequencies']))
  //   .value();
}

export function isRadioOk() {
  return true;
  // return _.isEmpty(getNonBackupedFrequencies(state, cwpId));
}

export function areRadiosOk() {
  return true;
  // const cwpIds = _.map(getCwps(state), cwp => cwp.id);
  // return _.every(cwpIds, cwpId => isRadioOk(state, cwpId));
}

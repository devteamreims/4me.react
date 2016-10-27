import {
  getBackupedRadios,
  getCwps,
  getCwpById,
} from './cwp';

import {
  getSectorsByCwpId,
} from './map';

import _ from 'lodash';

const emptyArray = [];

export function getNonBackupedFrequencies(state, cwpId) {
  const cwp = getCwpById(state, cwpId);

  if(_.isEmpty(cwp)) {
    return emptyArray;
  }
  const boundSectors = getSectorsByCwpId(state, cwpId);
  const backupedSectors = getBackupedRadios(state, cwpId);

  // No sectors bound, return empty array
  if(_.isEmpty(boundSectors)) {
    return emptyArray;
  }

  // No backuped frequencies on this cwp, return empty array
  if(_.isEmpty(backupedSectors)) {
    return emptyArray;
  }

  // Return non backuped frequencies
  return _.difference(boundSectors, backupedSectors);
}

export function getAllNonBackupedFrequencies(state) {
  return _(getCwps(state))
    .map(cwp => _.merge({}, cwp, {nonBackupedFrequencies: getNonBackupedFrequencies(state, cwp.id)}))
    .reject(cwp => _.isEmpty(cwp.nonBackupedFrequencies))
    .map(cwp => _.pick(cwp, ['id', 'name', 'nonBackupedFrequencies']))
    .value();
}

export function isRadioOk(state, cwpId) {
  return _.isEmpty(getNonBackupedFrequencies(state, cwpId));
}

export function areRadiosOk(state) {
  const cwpIds = _.map(getCwps(state), cwp => cwp.id);
  return _.every(cwpIds, cwpId => isRadioOk(state, cwpId));
}

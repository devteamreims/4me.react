import p from './prefix';
import _ from 'lodash';
import R from 'ramda';

import getEnv from '4me.env';
const { prettyName } = getEnv('LFEE').sectors;

export const getRaw = (state) => _.get(p(state), 'sectorTree', {});

export const isLoading = (state) => !!_.get(getRaw(state), 'isLoading');
export const isErrored = (state) => !_.isEmpty(_.get(getRaw(state), 'error'));

export const getTree = (state) => _.get(getRaw(state), 'sectorTree', []);

export const getPrettifySectors = () => (elementarySectors) => {
  if(!elementarySectors || R.isEmpty(elementarySectors)) {
    return '';
  }

  return prettyName(elementarySectors);
};

/* eslint-disable */
// export const getPrettifySectors = createSelector(
//   [getTree],
//   (sectorTree) => _.memoize((sectors = []) => {
//     const sectorComparator = (group1) => (group2) => {
//       const comp1 = _.map(group1, _.toUpper);
//       const comp2 = _.map(group2, _.toUpper);
//
//       return _.isEqual(_.sortBy(comp1), _.sortBy(comp2));
//     };
//
//     const equalsToGivenSectors = sectorComparator(sectors);
//
//     const item = _.find(sectorTree, (treeSector) => equalsToGivenSectors(_.get(treeSector, 'elementarySectors', [])));
//     return _.get(item, 'name', sectors.join(','));
//   })
// );


// export const getPrettifySectors = (state) => (sectors = []) => {
//   const sectorComparator = (group1) => (group2) => {
//     const comp1 = _.map(group1, _.toUpper);
//     const comp2 = _.map(group2, _.toUpper);
//
//     return _.isEqual(_.sortBy(comp1), _.sortBy(comp2));
//   };
//
//   const equalsToGivenSectors = sectorComparator(sectors);
//
//   const item = _.find(getTree(state), (treeSector) => equalsToGivenSectors(_.get(treeSector, 'elementarySectors', [])));
//   return _.get(item, 'name', sectors.join(','));
// };
/* eslint-enable */

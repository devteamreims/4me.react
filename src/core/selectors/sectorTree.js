import p from './prefix';
import _ from 'lodash';

import { createSelector } from 'reselect';

export const getRaw = (state) => _.get(p(state), 'sectorTree', {});

export const isLoading = (state) => !!_.get(getRaw(state), 'isLoading');
export const isErrored = (state) => !_.isEmpty(_.get(getRaw(state), 'error'));

export const getTree = (state) => _.get(getRaw(state), 'sectorTree', []);

export const getPrettifySectors = createSelector(
  [getTree],
  (sectorTree) => _.memoize((sectors = []) => {
    const sectorComparator = (group1) => (group2) => {
      const comp1 = _.map(group1, _.toUpper);
      const comp2 = _.map(group2, _.toUpper);

      return _.isEqual(_.sortBy(comp1), _.sortBy(comp2));
    };

    const equalsToGivenSectors = sectorComparator(sectors);

    const item = _.find(sectorTree, (treeSector) => equalsToGivenSectors(_.get(treeSector, 'elementarySectors', [])));
    return _.get(item, 'name', sectors.join(','));
  })
);

/*
export const getPrettifySectors = (state) => (sectors = []) => {
  const sectorComparator = (group1) => (group2) => {
    const comp1 = _.map(group1, _.toUpper);
    const comp2 = _.map(group2, _.toUpper);

    return _.isEqual(_.sortBy(comp1), _.sortBy(comp2));
  };

  const equalsToGivenSectors = sectorComparator(sectors);

  const item = _.find(getTree(state), (treeSector) => equalsToGivenSectors(_.get(treeSector, 'elementarySectors', [])));
  return _.get(item, 'name', sectors.join(','));
}
*/

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

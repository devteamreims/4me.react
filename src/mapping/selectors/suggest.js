import _ from 'lodash';
import p from './prefix';

export const getRaw = (state) => _.get(p(state), 'suggest', {});

export const getCwpId = (state) => _.get(getRaw(state), 'cwpId', -1);

export const isLoading = (state) => {
  const isSuggestLoading = !!_.get(getRaw(state), 'isLoading', false);
  return isSuggestLoading;
};

import {
  getSectorsByCwpId
} from './map';

export const getSuggestions = (state, cwpId) => {
  if(cwpId !== getCwpId(state)) {
    return [];
  }

  const sectorsBound = getSectorsByCwpId(state, cwpId);

  const suggestions = _.get(getRaw(state), 'suggestions', []);

  const addBoundSectorsToSuggestion = (cwpId) => (suggestion) => { // eslint-disable-line no-unused-vars
    if(_.isEmpty(sectorsBound)) {
      return suggestion;
    }

    const suggestionSectors = _.get(suggestion, 'sectors', []);
    const mergedSectors = _(suggestionSectors)
      .concat(...sectorsBound)
      .uniq()
      .value();
    return Object.assign({}, suggestion, {sectors: mergedSectors});
  };

  return _(suggestions)
    .map(addBoundSectorsToSuggestion(cwpId))
    .value();
};

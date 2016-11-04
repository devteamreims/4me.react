import React from 'react';

import Results from '../Results';

const SearchResults = ({
  onClickOnFlight,
}) => {
  return (
    <Results onClickOnFlight={onClickOnFlight} />
  );
};

export default SearchResults;

import React from 'react';

import IconButton from 'material-ui/IconButton';
import Refresh from 'material-ui/svg-icons/navigation/refresh';

const RefreshButton = (state) => (
  <IconButton
    onClick={() => window.location.reload(true)}
  >
    <Refresh />
  </IconButton>
);

export default RefreshButton;

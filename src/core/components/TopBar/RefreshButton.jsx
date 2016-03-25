import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import Refresh from 'material-ui/lib/svg-icons/navigation/refresh';

const RefreshButton = (state) => (
  <IconButton
    onClick={() => window.location.reload(true)}
  >
    <Refresh />
  </IconButton>
);

export default RefreshButton;

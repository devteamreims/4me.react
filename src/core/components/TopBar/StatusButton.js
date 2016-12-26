import React from 'react';

import IconButton from 'material-ui/IconButton';


import StatusIcon from '../Status/StatusIcon';

const StatusButton = ({status = 'normal'}) => {
  return (
    <IconButton>
      <StatusIcon
        level={status}
        colored={status !== 'normal'}
      />
    </IconButton>
  );
};

export default StatusButton;

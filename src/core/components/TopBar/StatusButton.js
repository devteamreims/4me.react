import React from 'react';

import IconButton from 'material-ui/IconButton';


import StatusIcon from '../../../shared/components/status/StatusIcon';

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

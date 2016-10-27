import React from 'react';

import IconButton from 'material-ui/IconButton';


import StatusIcon from '../Status/StatusIcon';

const StatusButton = (props) => {
  const {
    status = 'normal',
    ...other,
  } = props;

  return (
    <IconButton {...other}>
      <StatusIcon
        level={status}
        colored={status !== 'normal'}
      />
    </IconButton>
  );
};

export default StatusButton;

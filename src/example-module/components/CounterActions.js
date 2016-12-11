// @flow
import React from 'react';

import IconButton from 'material-ui/IconButton';
import {ContentAddCircle, ContentRemoveCircle} from 'material-ui/svg-icons';

export const Increment = ({...props}: any) => (
  <IconButton
    {...props}
  >
    <ContentAddCircle color="green" />
  </IconButton>
);

export const Decrement = ({...props}: any) => (
  <IconButton
    {...props}
  >
    <ContentRemoveCircle color="red" />
  </IconButton>
);

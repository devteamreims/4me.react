import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/lib/svg-icon';

let NumericBox7 = (props) => (
  <SvgIcon {...props}>
    <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M11,17L15,9V7H9V9H13L9,17H11Z" />
  </SvgIcon>
);

NumericBox7 = pure(NumericBox7);
NumericBox7.displayName = 'NumericBox7';

export default NumericBox7;

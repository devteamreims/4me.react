import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let NumericBox1 = (props) => (
  <SvgIcon {...props}>
    <path d="M14,17H12V9H10V7H14M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
  </SvgIcon>
);

NumericBox1 = pure(NumericBox1);
NumericBox1.displayName = 'NumericBox1';

export default NumericBox1;

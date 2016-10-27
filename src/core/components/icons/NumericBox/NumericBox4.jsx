/* eslint max-len: 0 */
import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let NumericBox4 = (props) => (
  <SvgIcon {...props}>
    <path d="M15,17H13V13H9V7H11V11H13V7H15M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
  </SvgIcon>
);

NumericBox4 = pure(NumericBox4);
NumericBox4.displayName = 'NumericBox4';

export default NumericBox4;

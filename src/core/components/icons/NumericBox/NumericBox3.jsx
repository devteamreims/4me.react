/* eslint max-len: 0 */
import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let NumericBox3 = (props) => (
  <SvgIcon {...props}>
    <path d="M15,10.5A1.5,1.5 0 0,1 13.5,12C14.34,12 15,12.67 15,13.5V15C15,16.11 14.11,17 13,17H9V15H13V13H11V11H13V9H9V7H13C14.11,7 15,7.89 15,9M19,3H5C3.91,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19C20.11,21 21,20.1 21,19V5A2,2 0 0,0 19,3Z" />
  </SvgIcon>
);

NumericBox3 = pure(NumericBox3);
NumericBox3.displayName = 'NumericBox3';

export default NumericBox3;

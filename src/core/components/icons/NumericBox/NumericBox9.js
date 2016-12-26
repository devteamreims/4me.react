/* eslint max-len: 0 */
import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let NumericBox9 = (props) => (
  <SvgIcon {...props}>
    <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M13,11H11V9H13V11M13,7H11A2,2 0 0,0 9,9V11C9,12.11 9.9,13 11,13H13V15H9V17H13A2,2 0 0,0 15,15V9C15,7.89 14.1,7 13,7Z" />
  </SvgIcon>
);

NumericBox9 = pure(NumericBox9);
NumericBox9.displayName = 'NumericBox9';

export default NumericBox9;

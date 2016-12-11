// @flow
import React from 'react';

type Props = {
  count: number,
  style: Object,
};

const Counter = ({count, style}: Props) => (
  <div style={style}>
    <h1>{count}</h1>
  </div>
);

export default Counter;

// @flow

export const INCREMENT = 'exampleModule/counter/INCREMENT';
export const DECREMENT = 'exampleModule/counter/DECREMENT';

export type Action =
  | {|type: 'exampleModule/counter/INCREMENT'|}
  | {|type: 'exampleModule/counter/DECREMENT'|}
;

export function increment(): Action {
  return {
    type: INCREMENT,
  };
}

export function decrement(): Action {
  return {
    type: DECREMENT,
  };
}

export const INCREMENT = 'exampleModule/counter/INCREMENT';
export const DECREMENT = 'exampleModule/counter/DECREMENT';

export function increment() {
  return {
    type: INCREMENT,
  };
}

export function decrement() {
  return {
    type: DECREMENT,
  };
}

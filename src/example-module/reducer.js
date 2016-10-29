import {
  INCREMENT,
  DECREMENT,
} from './actions';

const defaultState = {
  counter: 5,
};

export default function exampleReducer(state = defaultState, action) {
  switch(action.type) {
    case INCREMENT:
      return Object.assign({}, {counter: state.counter + 1});
    case DECREMENT:
      return Object.assign({}, {counter: state.counter - 1});
  }

  return state;
}

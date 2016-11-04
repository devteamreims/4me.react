import {
  INCREMENT,
  DECREMENT,
} from './actions';

const defaultState = {
  counter: 0,
};

export default function exampleReducer(state = defaultState, action) {
  switch(action.type) {
    case INCREMENT:
      return Object.assign({}, {counter: state.counter + 1});
    case DECREMENT: {
      // Do not allow negative values in our counter
      if(state.counter === 0) {
        return state;
      }
      return Object.assign({}, {counter: state.counter - 1});
    }
  }

  return state;
}

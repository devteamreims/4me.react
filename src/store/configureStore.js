import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistState } from 'redux-devtools';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { getReducers } from '../organs';

export function createRootReducer(reducers) {
  // eslint-disable-next-line global-require
  const coreReducer = require('../core/reducers').default;
  const stubReducer = (state = {}) => state;

  const organReducers = getReducers();

  return combineReducers(
    Object.assign(
      {
        core: coreReducer,
        stub: stubReducer,
      },
      organReducers,
      reducers
    )
  );
}

export default function configureStore(initialState) {
  let enhancer;
  const logger = createLogger();
  const middleware = applyMiddleware(thunk, logger);

  if (process.env.NODE_ENV !== 'production') {
    const getDebugSessionKey = () => {
      // By default we try to read the key from ?debug_session=<key> in the address bar
      const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
      return (matches && matches.length) ? matches[1] : null;
    };

    enhancer = compose(

      // Middleware we want to use in development
      middleware,
      window.devToolsExtension ?
        window.devToolsExtension() :
        // eslint-disable-next-line global-require
        require('../dev/DevTools').default.instrument({ maxAge: 30 }),

      // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
      persistState(getDebugSessionKey())
    );
  } else {
    enhancer = compose(middleware);
  }

  const store = createStore(createRootReducer({}), initialState, enhancer);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../core/reducers', () =>
      store.replaceReducer(createRootReducer({}))
    );
  }

  return store;
}

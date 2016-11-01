import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistState } from 'redux-devtools';

import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';

import * as MappingModule from '../mapping';
import * as ExampleModule from '../example-module';
import * as XmanModule from '../xman';
import * as EtfmsProfileModule from '../arcid';


export function createRootReducer() {
  // eslint-disable-next-line global-require
  const core = require('../core/reducers').default;

  return combineReducers({
    core,
    [ExampleModule.name]: ExampleModule.getReducer(),
    [MappingModule.name]: MappingModule.getReducer(),
    [XmanModule.name]: XmanModule.getReducer(),
    [EtfmsProfileModule.name]: EtfmsProfileModule.getReducer(),
  });
}

export default function configureStore(initialState) {
  let enhancer;
  // const logger = createLogger();
  // const middleware = applyMiddleware(thunk, logger);
  const middleware = applyMiddleware(thunk);

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

  const store = createStore(
    createRootReducer(),
    initialState,
    enhancer
  );

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept(
      [
        '../core/reducers',
        '../arcid',
        '../example-module',
        '../mapping',
        '../xman',
      ],
      () => {
        store.replaceReducer(createRootReducer());
      }
    );
  }

  return store;
}

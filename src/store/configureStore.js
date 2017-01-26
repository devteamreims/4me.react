import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';

import { createRootReducer } from './rootReducer';
import { createRootSaga } from './rootSaga';

import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';

// import createLogger from 'redux-logger';

export default function configureStore(initialState) {
  let enhancer;
  // const logger = createLogger();
  // const middleware = applyMiddleware(thunk, logger);

  const sagaMiddleware = createSagaMiddleware();

  const middleware = applyMiddleware(
    thunk,
    sagaMiddleware,
  );

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

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  store.runSaga(createRootSaga());

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept(
      [
        '../core/reducers',
        '../modules/etfms-profile/reducers',
        '../modules/mapping/reducers',
        '../modules/xman/reducers',
        '../modules/example-module/reducer',
      ],
      () => {
        console.debug('HMR: replace reducers !');
        store.replaceReducer(createRootReducer());
      }
    );
  }

  return store;
}

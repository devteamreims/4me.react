import { injectAsyncReducers } from './store/configureStore';
import R from 'ramda';
/*
  This is our organ loading process. This happens at compile time
  First, we define all possible organs here
*/
const organs = () => {
  const disabledOrgans = R.propOr([], 'disabledOrgans', window.FOURME_CONFIG);

  return R.omit(
    disabledOrgans,
    {
      exampleModule: {
        displayName: 'Example module',
        pathName: '/example-module',
        widgetColumns: 2,
        ...require('./example-module').default,
      },
      mapping: {
        displayName: 'Control room',
        pathName: '/mapping',
        widgetColumns: 2,
        ...require('./mapping').default,
      },
      etfmsProfile: {
        displayName: 'Etfms profile',
        pathName: '/etfms_profile',
        widgetColumns: 1,
        ...require('./arcid').default,
      },
      xman: {
        displayName: 'XMAN',
        pathName: '/xman',
        widgetColumns: 2,
        ...require('./xman').default,
      },
    },
  );
};

export function getOrgans(store) {
  const asyncReducers = R.pipe(
    R.map(R.prop('getReducer')),
    R.filter(R.identity),
    R.mapObjIndexed((getReducer, name) => getReducer(name)),
  )(organs());

  // This is not pretty, but it works just fine
  // TODO: Refactor
  if(module.hot) {
    module.hot.accept(['./example-module', './mapping', './arcid', './xman'], () => {
      const asyncReducers = R.pipe(
        R.map(R.prop('getReducer')),
        R.filter(R.identity),
        R.mapObjIndexed((getReducer, name) => getReducer(name)),
      )(organs());

      injectAsyncReducers(store, asyncReducers);
    });
  }


  injectAsyncReducers(store, asyncReducers);

  return organs();
}

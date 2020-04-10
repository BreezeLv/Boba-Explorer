import createReducer from '../reducers';

export function injectReducerFactory(store) {
  return function injectReducer(key, reducer) {

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store) {
  // checkStore(store);

  return {
    injectReducer: injectReducerFactory(store),
  };
}

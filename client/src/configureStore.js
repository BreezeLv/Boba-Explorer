import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import ReduxThunk from 'redux-thunk';

import createReducer from './reducers';

export default function configureStore(initialState = {}, history) {
    const logger = createLogger()
    const middlewares = [logger, routerMiddleware(history), ReduxThunk];
    const store = createStore(createReducer(), initialState, compose(applyMiddleware(...middlewares)))

    //Extensions
    store.injectedReducers = {}; // Reducer registry

    return store;
}
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';


function _getMiddleware(history) {
    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    return applyMiddleware(...middleware);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(history, initialState) {
    return composeEnhancers(
        _getMiddleware(history)
    )(createStore)(rootReducer, initialState);
}

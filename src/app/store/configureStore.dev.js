import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk,promise))


export default function configureStore(initialState) {
    const store = createStore(rootReducer,
        initialState, enhancer
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
        const nextReducer = require('../reducers').default; // eslint-disable-line global-require
        store.replaceReducer(nextReducer);
        });
    }

    return store;
}


import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import composeWithDevTools from 'remote-redux-devtools'
import rootReducer from './rootReducer'

export default (initialState = {}) => {
    const middleware = [thunk]
    const composeEnhancers = composeWithDevTools({realtime: true})
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware)
        )
    )

    if (module.hot) {
        // Enable hot module replacement for reducers
        module.hot.accept(() => {
          const nextRootReducer = require('./rootReducer').default;
          store.replaceReducer(nextRootReducer);
        });
    }

    return store
}

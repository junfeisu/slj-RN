import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default (initialState = {}) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const middleware = [thunk]

    // ======================================================
    // Store Enhancers
    // ======================================================
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware)
        )
    )

    return store
}

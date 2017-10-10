import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import composeWithDevTools from 'remote-redux-devtools'
import rootReducer from './reducer/index'

export default (initialState = {}) => {
    const composeEnhancers = composeWithDevTools({realtime: true, port: 5000})
    const enhancer = compose(
        applyMiddleware(thunk),
        composeWithDevTools({
            realtime: true,
            hostname: 'localhost',
            port: 5000
        })
    )
    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    )

    // if (module.hot) {
    //     // Enable hot module replacement for reducers
    //     module.hot.accept(() => {
    //       const nextRootReducer = require('./reducer/index').default;
    //       store.replaceReducer(nextRootReducer);
    //     });
    // }

    return store
}

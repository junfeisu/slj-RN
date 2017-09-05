import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import RouteContainer from './route'
import rootReducer from './reducer/rootReducer'

const initState = {}
const store = createStore(rootReducer)

export default class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <RouteContainer />
            </Provider>
        )
    }
}

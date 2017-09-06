import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import { Router } from 'react-native-router-flux'
import Scenes from './route'
import rootReducer from './reducer/rootReducer'

const store = createStore(rootReducer)
const ConnectedRouter = connect()(Router)

export default class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <ConnectedRouter scenes={Scenes} />
            </Provider>
        )
    }
}

import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './reducer/createStore'
import { Router } from 'react-native-router-flux'
import Scenes from './route'

const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)
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

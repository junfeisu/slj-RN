import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Provider, connect } from 'react-redux'
import createStore from './store/createStore'
import { Router } from 'react-native-router-flux'
import Scenes from './route'
import Storage from 'react-native-storage'
import host from './common/config'
import SocketIOClient from 'socket.io-client'

const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)
const RouterWithRedux = connect()(Router)

global.socket = SocketIOClient(host)
global.storage = new Storage({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24 * 7,
    enableCache: true
})

export default class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <RouterWithRedux scenes={Scenes} />
            </Provider>
        )
    }
}

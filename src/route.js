import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './component/user/login'
import Register from './component/user/register'

class RouteContainer extends Component {
    render () {
        return <Router>
            <Scene key="root">
                <Scene key="login" component={Login} title="登录"></Scene>
                <Scene key="register" component={Register} title="注册"></Scene>
            </Scene>
        </Router>
    }
}

export default RouteContainer

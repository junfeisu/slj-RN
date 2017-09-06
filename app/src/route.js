import React, { Component } from 'react'
import { Scene, Actions } from 'react-native-router-flux'
import Login from './component/user/login'
import Register from './component/user/register'

const Scenes = Actions.create(
    <Scene>
        <Scene key="login" component={Login} title="登录"></Scene>
        <Scene key="register" component={Register} title="注册"></Scene>
    </Scene>
)

export default Scenes

import React, { Component } from 'react'
import { Scene, Actions } from 'react-native-router-flux'
import Login from './component/user/login'
import Register from './component/user/register'
import UpdatePassword from './component/user/updatePassword'
import ArticleDetail from './component/article/detail'
import Main from './component/mainPage'

const Scenes = Actions.create(
    <Scene>
        <Scene key="login" component={Login} hideNavBar={true}></Scene>
        <Scene key="register" component={Register} hideNavBar={true}></Scene>
        <Scene key="main" component={Main} hideNavBar={true}></Scene>
        <Scene key="updatePassword" component={UpdatePassword} hideNavBar={true}></Scene>
        <Scene key="articleDetail" component={ArticleDetail} hideNavBar={true}></Scene>
    </Scene>
)

export default Scenes

import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Image } from 'react-native'
import { TabBar, Icon } from 'antd-mobile'

import Article from './mainPage/article'
import Picture from './mainPage/picture'
import Profile from './mainPage/profile'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    tabText: {
        color: '#000000',
        fontSize: 10
    },
    selectedTabText: {
        color: '#D81E06'
    }
})

const deviceW = Dimensions.get('window').width
const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class Test extends Component {
    constructor() {
        super()
        this.state = {
            selectedTab: 'main'
        }
    }

    render() {
        const { selectedTab } = this.state
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                <TabBar.Item
                    selected={selectedTab === 'main'}
                    title="首页"
                    key="首页"
                    icon={{uri: 'http://7xrp7o.com1.z0.glb.clouddn.com/love.png'}}
                    selectedIcon={{uri: 'http://7xrp7o.com1.z0.glb.clouddn.com/love-selected.png'}}
                    onPress={() => this.setState({selectedTab: 'main'})}
                >
                    <Article />
                </TabBar.Item>
                <TabBar.Item
                    selected={selectedTab === 'picture'}
                    title="美图"
                    key="美图"
                    icon={{uri: 'http://7xrp7o.com1.z0.glb.clouddn.com/picture.png'}}
                    selectedIcon={{uri: 'http://7xrp7o.com1.z0.glb.clouddn.com/picture-selected.png'}}
                    selectedTitleStyle={styles.selectedTabText}
                    onPress={() => this.setState({selectedTab: 'picture'})}
                >
                    <Picture />
                </TabBar.Item>
                <TabBar.Item
                    selected={selectedTab === 'profile'}
                    title="我的"
                    key="我的"
                    icon={{uri: 'http://7xrp7o.com1.z0.glb.clouddn.com/user.png'}}
                    selectedIcon={{uri: 'http://7xrp7o.com1.z0.glb.clouddn.com/user-selected.png'}}
                    selectedTitleStyle={styles.selectedTabText}
                    onPress={() => this.setState({selectedTab: 'profile'})}
                >
                    <Profile />
                </TabBar.Item>
            </TabBar>
        )
    }
}

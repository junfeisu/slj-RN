import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
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

export default class Test extends Component {
    constructor(props) {
        super(props)
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
                    icon={require('../assets/image/love.png')}
                    selectedIcon={require('../assets/image/love-selected.png')}
                    onPress={() => this.setState({selectedTab: 'main'})}
                >
                    <Article {...this.props} />
                </TabBar.Item>
                <TabBar.Item
                    selected={selectedTab === 'picture'}
                    title="美图"
                    key="美图"
                    icon={require('../assets/image/picture.png')}
                    selectedIcon={require('../assets/image/picture-selected.png')}
                    selectedTitleStyle={styles.selectedTabText}
                    onPress={() => this.setState({selectedTab: 'picture'})}
                >
                    <Picture {...this.props}/>
                </TabBar.Item>
                <TabBar.Item
                    selected={selectedTab === 'profile'}
                    title="我的"
                    key="我的"
                    icon={require('../assets/image/user.png')}
                    selectedIcon={require('../assets/image/user-selected.png')}
                    selectedTitleStyle={styles.selectedTabText}
                    onPress={() => this.setState({selectedTab: 'profile'})}
                >
                    <Profile {...this.props}/>
                </TabBar.Item>
            </TabBar>
        )
    }
}

import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import Icon from 'react-native-vector-icons/FontAwesome'

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
        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'main'}
                    title="首页"
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={() => <Icon name="home" size={px2dp(22)} color="#666666"/>}
                    onPress={() => this.setState({selectedTab: 'main'})}
                >
                    <Article />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'picture'}
                    title="美图"
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={() => <Icon name="photo" size={px2dp(22)} color="#3496f0"/>}
                    onPress={() => this.setState({selectedTab: 'picture'})}
                >
                    <Picture />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'profile'}
                    title="我的"
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
                    onPress={() => this.setState({selectedTab: 'profile'})}
                >
                    <Profile />
                </TabNavigator.Item>
            </TabNavigator>
        )
    }
}

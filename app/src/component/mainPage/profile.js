import React, { Component } from 'react'
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Popover } from 'antd-mobile'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    profile: {
        alignItems: 'center',
        height: windowHeight,
        backgroundColor: '#ccc'
    },
    menu: {
        width: windowWidth,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#000',
        position: 'relative'
    },
    menuTitle: {
        color: '#fff',
        flex: 1,
        textAlign: 'right',
        marginLeft: 20
    },
    popover: {
        width: 20,
        // height: 20,
        left: 160
    },
    backUserIcon: {
        width: windowWidth,
        height: windowHeight * 0.35
    },
    backShadow: {
        width: windowWidth,
        height: windowHeight * 0.35,
        backgroundColor: '#000',
        opacity: 0.6,
        position: 'absolute'
    },
    desc: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#ffe500'
    },
    username: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    slogan: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    operation: {
        marginTop: 20
    },
    item: {
        width: windowWidth,
        height: 45,
        lineHeight: 30,
        paddingLeft: 10,
        color: '#000',
        backgroundColor: '#fff',
        borderBottomColor: '#444',
        borderBottomWidth: 1
    }
})

export default class Profile extends Component {
    constructor () {
        super()
        this.state = {
            user: {
                username: '',
                slogan: '',
                birthday: '',
                user_icon: ''
            }
        }
    }

    updatePassword = () => {
        Actions.updatePassword()
    }

    componentWillMount () {
        storage.load({
            key: 'user'
        }).then(ret => {
            this.setState({
                user: ret
            })
        }).catch(err => {
            Actions.login()
        })
    }

    render () {
        const { username, slogan, birthday, user_icon } = this.state.user
        const Item = Popover.Item
        return (
            <View style={styles.profile}>
                <Image source={{uri: user_icon}} style={styles.backUserIcon}>
                    <View style={styles.backShadow}></View>
                    <View style={styles.desc}>
                        <Image source={{uri: user_icon}} style={styles.avatar}></Image>
                        <View style={styles.info}>
                            <Text style={styles.username}>{username}</Text>
                            <Text style={styles.slogan}>{slogan}</Text>
                        </View>
                    </View>
                </Image>
                <View style={styles.operation}>
                    <Text style={styles.item}>关于作者</Text>
                    <Text style={styles.item} onPress={this.updatePassword}>修改密码</Text>
                    <Text style={styles.item}>退出</Text>
                </View>
            </View>
        )
    }
}

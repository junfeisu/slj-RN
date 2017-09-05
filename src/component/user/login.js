import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet
} from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginBtn: {
        borderWidth: 0,
        width: 70,
        height: 30,
        marginTop: 20,
        borderRadius: 4,
        backgroundColor: 'blue',
        color: 'white',
        textAlignVertical: 'center'
    },
    loginInput: {
        width: 100,
        height: 30,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray'
    },
    background: {
        alignItems: 'stretch',
        flex: 1
    }
})

export default class Login extends Component {
    constructor () {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    login = () => {
        Actions.register()
    }

    render () {
        return (
            <View style={styles.login}>
                <Image 
                    style={styles.background} 
                    source={require('../../assets/image/bg.jpg')}
                />
                <Text>登录</Text>
                <TextInput 
                    style={styles.loginInput}
                    value={this.state.username}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({username: text})}
                />
                <TextInput 
                    style={styles.loginInput}
                    value={this.state.password}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({password: text})}
                />
                <Button
                    style={styles.loginBtn}
                    onPress={this.login}
                >
                    登录
                </Button>
            </View>
        )
    }
}

import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    Image,
    TextInput,
    Keyboard,
    StyleSheet
} from 'react-native'
import Button from 'react-native-button'
import KeyboardSpacer from '../../common/KeyboardSpacer'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'

const styles = StyleSheet.create({
    background: {
        resizeMode: 'cover',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null
    },
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginContainer: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20
    },
    loginInput: {
        width: 200,
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 3,
        fontSize: 14,
        padding: 0,
        paddingLeft: 10
    },
    loginBtn: {
        width: 200,
        height: 40,
        textAlignVertical: 'center',
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: '#3b99fc',
        color: 'white'
    },
    otherOperation: {
        width: 150,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 10
    },
    otherOperationText: {
        color: '#3b99fc',
        fontSize: 16,
        fontWeight: 'bold'
    },
    separator: {
        height: 25,
        width: 1,
        backgroundColor: 'rgba(0, 0, 0, .9)'
    }
})

export default class Login extends Component {
    constructor () {
        super()
        this.state = {
            username: '',
            password: '',
            keyboardSpaceHeight: 0
        }
    }

    login = () => {
        axios.post('http://localhost:8000/user/login', {
            username: this.state.username,
            password: this.state.password
        }, {
           headers: {
            'Content-Type': 'application/json'
           }
        })
            .then(response => {
                console.log('response')
                Actions.main()
            })
            .catch(err => {
                console.log('err is ', err)
            })
    }

    forgetPassword = () => {
        console.log('forget password')
    }

    jumpRegister = () => {
        Actions.register()
    }

    keyboardDidShowHandler = () => {
        if (!this.endCoordinates) {
            return
        }

        let keyboardHeight = this.endCoordinates.height
        this.setState({
            keyboardSpaceHeight: keyboardHeight
        })
    }

    keyboardDidHideHandler = () => {
        this.setState({
            keyboardSpaceHeight: 0
        })
    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShowHandler)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHideHandler)
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    render () {
        const { username, password, keyboardSpaceHeight } = this.state
        return (
                <Image 
                    style={styles.background} 
                    source={require('../../assets/image/bg.jpg')}
                >
                    <ScrollView contentContainerStyle={styles.login}>
                        <View style={styles.loginContainer}>
                            <Text style={styles.title}>登录</Text>
                            <TextInput 
                                style={styles.loginInput}
                                value={username}
                                placeholder="Username"
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({username: text})}
                            />
                            <TextInput 
                                style={styles.loginInput}
                                value={password}
                                placeholder="Password"
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({password: text})}
                            />
                            <Button
                                style={styles.loginBtn}
                                onPress={this.login}
                            >
                                登录
                            </Button>
                            <View style={styles.otherOperation}>
                                <Text style={styles.otherOperationText} onPress={this.forgetPassword}>忘记密码</Text>
                                <Text style={styles.separator}></Text>
                                <Text style={styles.otherOperationText} onPress={this.jumpRegister}>注册</Text>
                            </View>
                        </View>
                        <KeyboardSpacer keyboardSpaceHeight={keyboardSpaceHeight} />
                    </ScrollView>
                </Image>
        )
    }
}

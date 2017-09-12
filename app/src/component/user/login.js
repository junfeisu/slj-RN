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

const styles = StyleSheet.create({
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
    background: {
        resizeMode: 'cover',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20
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
        Actions.register()
    }

    keyboardDidShowHandler = () => {
        console.log('show')
        if (!this.endCoordinates) {
            return
        }

        let keyboardHeight = this.endCoordinates.height
        this.setState({
            keyboardSpaceHeight: keyboardHeight
        })
    }

    keyboardDidHideHandler = () => {
        console.log('hide')
        this.setState({
            keyboardSpaceHeight: 0
        })
    }

    componentWillMount () {
        console.log('willMount')
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShowHandler)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHideHandler)
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    render () {
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
                                value={this.state.username}
                                placeholder="Username"
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({username: text})}
                            />
                            <TextInput 
                                style={styles.loginInput}
                                value={this.state.password}
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
                        </View>
                        <KeyboardSpacer keyboardSpaceHeight={this.state.keyboardSpaceHeight} />
                    </ScrollView>
                </Image>
        )
    }
}

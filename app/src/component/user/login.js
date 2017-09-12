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
        fontSize: 14,
        padding: 10
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
        marginBottom: 50
    }
})

export default class Login extends Component {
    constructor () {
        super()
        this.state = {
            username: 'sujunfei',
            password: ''
        }
    }

    login = () => {
        Actions.register()
    }

    render () {
        return (
            <Image 
                style={styles.background} 
                source={require('../../assets/image/bg.jpg')}
            >
                <View style={styles.login}>
                    <Text style={styles.title}>登录</Text>
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
            </Image>
        )
    }
}

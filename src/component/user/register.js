import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
    register: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    registerBtn: {
        backgroundColor: 'blue',
        color: 'white'
    }
})

export default class Register extends Component {
    constructor () {
        super()
    }

    register = () => {
        Actions.login()
    }

    render () {
        return (
            <View style={styles.register}>
                <Text>注册</Text>
                <Button
                    style={styles.registerBtn}
                    onPress={this.register}
                >
                    注册
                </Button>
            </View>
        )
    }
}

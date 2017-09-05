import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
})

export default class Login extends Component {
    render () {
        return (
            <View style={styles.login}>
                <Text>this is login page</Text>
            </View>
        )
    }
}

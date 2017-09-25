import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
    
})

export default class Profile extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <ScrollView>
                <View>
                    <Text>This is Profile</Text>
                </View>
            </ScrollView>
        )
    }
}

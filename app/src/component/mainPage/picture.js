import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native'

const styles = StyleSheet.create({

})

export default class Picture extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <ScrollView>
                <View>
                    <Text>This is picture</Text>
                </View>
            </ScrollView>
        )
    }
}

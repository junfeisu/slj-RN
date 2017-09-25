import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({

})

export default class Article extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <ScrollView>
                <View>
                    <Text>This is article</Text>
                </View>
            </ScrollView>
        )
    }
}

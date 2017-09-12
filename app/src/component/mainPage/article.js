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

    componentWillMount () {
        Actions.refresh({title: '话题'})
    }

    shouldComponentUpdate () {
        Actions.refresh({title: '话题'})
        return false
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

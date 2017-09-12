import React, { Component, PropTypes } from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        left: 0,
        right: 0,
        bottom: 0
    }
})

export default class KeyboardSpacer extends Component {
    constructor () {
        super()
    }

    static propTypes = {
        keyboardSpaceHeight: PropTypes.number
    }

    static defaultProps = {
        keyboardSpaceHeight: 0
    }

    render () {
        let { keyboardSpaceHeight } = this.props
        return (
            <View style={[styles.container, {height: ~~keyboardSpaceHeight}]}></View>
        )
    }
}
